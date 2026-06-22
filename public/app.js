const urlInput = document.getElementById("yturl");
const btn = document.getElementById("btn");
const statusBox = document.getElementById("status");

// basit validasyon
urlInput.addEventListener("input", () => {
  const v = (urlInput.value || "").trim();
  btn.disabled = !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(v);
});

btn.addEventListener("click", async () => {
  const url = (urlInput.value || "").trim();
  if (!url) return;

  btn.disabled = true;
  setStatus("Dönüştürülüyor... Bu işlem videonun uzunluğuna göre zaman alabilir.");

  try {
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || `İstek başarısız (HTTP ${res.status})`);
    }

    // MP3 blob olarak gelir, indir
    const blob = await res.blob();
    // Dosya adını response headerdan alamadığımız durumlar için fallback:
    const filename = getFileNameFromDisposition(res.headers.get("Content-Disposition")) || "audio.mp3";

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setStatus("Bitti. MP3 indirildi ✅");
  } catch (e) {
    console.error(e);
    setStatus("Hata: " + (e?.message || e));
  } finally {
    btn.disabled = false;
  }
});

function setStatus(txt) {
  statusBox.textContent = txt || "";
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

// Content-Disposition'dan dosya adını okuma
function getFileNameFromDisposition(h) {
  if (!h) return null;
  const m = /filename\*?=([^;]+)/i.exec(h);
  if (!m) return null;
  let val = m[1].trim();
  // RFC 5987'de UTF-8''... formatı gelebilir
  if (val.startsWith("UTF-8''")) {
    val = decodeURIComponent(val.substring(7));
  }
  return val.replace(/^"|"$/g, "");
}