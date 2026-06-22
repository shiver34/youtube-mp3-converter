# 🎵 YouTube → MP3 Dönüştürücü (Yerel)

Yerel bilgisayarında YouTube videolarını MP3 formatına dönüştüren basit araç.

---

## ⚡ HIZLI BAŞLANGAÇ (2 Adım)

### **Adım 1: Node.js İndir ve Kur**

📥 [nodejs.org](https://nodejs.org/) adresine git → **LTS sürümü indir** → Kur

Kontrol et (PowerShell/CMD'de):
```
node --version
```

### **Adım 2: Uygulamayı Çalıştır**

Proje klasöründe `setup.bat` dosyasına **çift tıkla** 

Otomatik olacak:
- ✅ Paketleri indirecek
- ✅ Sunucuyu başlatacak
- ✅ Tarayıcı linkini gösterecek

---

## 🌐 Kullanım

1. Sunucu başladı mı? → Tarayıcıda aç: **http://localhost:3000**

2. YouTube linkini yapıştır:
   ```
   https://www.youtube.com/watch?v=VIDEO_ID
   ```

3. "Dönüştür" butonuna bas

4. MP3 indirilir ✅

---

## 📋 Teknik Bilgi

**Gerekli:**
- Node.js (v16+)
- Internet bağlantısı

**İndirilen Paketler:**
- Express (web sunucusu)
- youtube-dl-exec (video indirme)
- sanitize-filename (dosya güvenliği)

---

## ⚠️ Yasal Uyarı

- **Sadece kişisel/test amaçlı kullanın**
- YouTube Şartlar ve Koşulları ihlal edilebilir
- Telif hakkı korumalı içerik indirmeyin
- **Sizin sorumluluk**

---

## 🆘 Sorun Giderme

### Hata: "Node.js yüklü değil"
→ [nodejs.org](https://nodejs.org/) adresinden indir ve kur

### Hata: "Port 3000 zaten kullanılıyor"
→ CMD'de şunu çalıştır:
```powershell
$env:PORT=3001; node server.js
```
Sonra aç: `http://localhost:3001`

### Hata: "HTTP 405"
→ YouTube linkini kontrol et (sadece video URL'i, playlist parameter'i yok)

### Hiç çalışmadı?
→ Klasör yolunda Türkçe karakter var mı? Çıkar ve yeniden dene.

---

## 💻 Manuel Çalıştırma (İleri Kullanıcılar)

```powershell
# Paketleri indir
npm install

# Sunucuyu başlat
npm start

# Veya geliştirme modunda (otomatik restart):
npm run dev
```

---

## 📞 İletişim

Sorun buldum → GitHub Issues'e yaz

---

**Son Güncelleme:** 22.06.2026
