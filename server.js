// server.js
// *** Yalnızca yerel/test amaçlı kullanım. Yayına açmayın. ***

const express = require("express");
const path = require("path");
const fs = require("fs");
const os = require("os");
const sanitize = require("sanitize-filename");

// youtube-dl-exec'i konfigüre et
// Docker'da pip'ten yüklü yt-dlp, lokal'de bin klasöründeki binary
let ytdlpPath;
try {
  // Local binary'yi dene
  ytdlpPath = path.join(__dirname, "bin", "yt-dlp.exe");
  if (process.platform !== "win32") {
    ytdlpPath = path.join(__dirname, "bin", "yt-dlp");
  }
  fs.accessSync(ytdlpPath);
} catch (e) {
  // Local yoksa, sistem PATH'den yt-dlp'yi kullan (Docker)
  ytdlpPath = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
}

const ytdlp = require("youtube-dl-exec").create(ytdlpPath);

const app = express();
const PORT = process.env.PORT || 3000; // 3000 doluysa sorun çıkmasın

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_, res) => res.json({ ok: true, ts: Date.now() }));

app.post("/api/convert", async (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Geçerli bir URL gönderin." });
  }

  // Sadece YouTube kabul et
  if (!/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url)) {
    return res.status(400).json({ error: "Yalnızca YouTube linkleri." });
  }

  // Geçici çalışma klasörü
  const tmpDir = path.join(
    os.tmpdir(),
    `ytmp3_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // Önce bilgi çek (başlık için). Playlist kapalı!
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      noPlaylist: true, // <- önemli
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }, { shell: false });

    const rawTitle = (info && (info.title || info.fulltitle)) || "audio";
    
    // Başlığı temizle - Türkçe karakterleri koru, gereksiz olanları kaldır
    let cleanTitle = rawTitle
      .replace(/\s+/g, " ")           // Çoklu boşlukları tek boşluğa çevir
      .replace(/[<>:"|?*\/\\]/g, "")  // Dosya adında yasak karakterleri kaldır
      .substring(0, 60)               // İlk 60 karakter
      .trim();
    
    // Eğer boş kaldıysa fallback
    if (!cleanTitle || cleanTitle.length === 0) {
      cleanTitle = "audio";
    }
    
    // Sonunda da sanitize et (Türkçe karakterleri koru)
    const safeTitle = sanitize(cleanTitle) || "audio";

    // Çıktı şablonu: temp klasöre
    const outputTemplate = path.join(tmpDir, "%(title)s.%(ext)s");

    // Doğrudan MP3’e dönüştür (FFmpeg gerekli)
    await ytdlp(url, {
      format: "bestaudio/best",
      extractAudio: true,
      audioFormat: "mp3",
      audioQuality: "192",   // stabil kalite
      noPlaylist: true,    // <- önemli
      output: outputTemplate,
      noCheckCertificates: true,
      noWarnings: true,      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",      // yavaş ağlarda işe yarar (socket timeout)
      socketTimeout: "30",
    }, {
      // büyük çıktılarda buffer yetersizliği olmasın
      maxBuffer: 1024 * 1024 * 32
    });

    // MP3 dosyasını bul
    const files = fs.readdirSync(tmpDir);
    const mp3 = files.find(f => f.toLowerCase().endsWith(".mp3"));
    if (!mp3) {
      throw new Error("MP3 dosyası oluşturulamadı.");
    }

    const mp3Path = path.join(tmpDir, mp3);
    const downloadName = `${safeTitle}.mp3`;

    // İndirme olarak gönder
    res.download(mp3Path, downloadName, (err) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      if (err) console.error("İndirme sırasında hata:", err);
    });
  } catch (e) {
    console.error("Dönüştürme hatası:", e);
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    res.status(500).json({ error: e?.message || String(e) });
  }
});

// Son olarak diğer istekleri index'e yönlendir
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Yerel sunucu ayakta: http://localhost:${PORT}`);
});
