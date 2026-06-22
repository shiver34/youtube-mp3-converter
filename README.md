# 🎵 YouTube → MP3 Dönüştürücü (Yerel)

Yerel bilgisayarında YouTube videolarını MP3 formatına dönüştüren basit araç.

---

## ⚠️ **ÖNEMLI - YASAL UYARI & DİSCLAIMER**

> **BU PROJE YALNIZCA KİŞİSEL / TEST / ÖĞRENİM AMAÇLIDIR**

### **Sorumluluk Reddi (Disclaimer)**

**ÖNEMLİ:** Bu projeyi kullanarak, aşağıdakileri kabul etmiş olursunuz:

1. ❌ **YAYINLAMAYINIZ** - Bu proje üretime veya ticari amaçla kullanılamaz
2. ❌ **YASAL RİSK** - YouTube Şartlar & Koşulları ihlal edebilir
3. ❌ **TELİF HAKKI** - Koruma altında olan içerik indirmeyin
4. ❌ **SORUMLULUK** - Yasal sorun çıkarsa, sizin tamamen sorumluluğunuzdur
5. ❌ **GARANTİ YOK** - Bu proje "olduğu gibi" sunulur, hiçbir garanti yoktur

**YAZARLAR VE KÖK DEPOSİ SAHİPLERİ:** 
- Hiçbir sorumluluğu kabul etmemektedir
- Telif hakkı ihlali, DMCA ihlali vb. konulardan sorumlu değildir
- Kullanıcıların yaptıkları her şeyden tamamen sorumludur

### **Sizin Sorumluluğunuz:**

- ✅ Sadece **kişisel ve yasal içerik** indir
- ✅ **Telif hakkı** konusunu araştır
- ✅ **Yerel yasal koşullar**'ı kontrol et
- ✅ YouTube ToS'u oku ve ihlal etme

---

## ⚡ HIZLI BAŞLANGAÇ

### **Adım 1: Docker Desktop Kur**
📥 [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) indir → Kur → Restart

### **Adım 2: Docker Image'ı Build Et**
Proje klasöründe PowerShell/CMD aç ve çalıştır:
```powershell
docker build -t ytmp3 .
```
(İlk kez ~1-2 dakika sürer, sonra cache'den hızlı açılır)

### **Adım 3: Konteyner'ı Çalıştır**
```powershell
docker run -p 3000:3000 ytmp3
```

Tarayıcıda aç: **http://localhost:3000**

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

---

## 🆘 Sorun Giderme

### **Node.js Kurulumu Hataları**

#### Hata: "Node.js yüklü değil"
→ [nodejs.org](https://nodejs.org/) adresinden indir ve kur

#### Hata: "Port 3000 zaten kullanılıyor"
→ CMD'de şunu çalıştır:
```powershell
$env:PORT=3001; node server.js
```
Sonra aç: `http://localhost:3001`

---

### **Docker Kurulumu Hataları**

#### Hata: "docker: command not found" veya Docker açılmıyor
→ Docker Desktop'ı indir ve yeniden başlat: [docker.com](https://www.docker.com/products/docker-desktop)

#### Hata: "Error response from daemon"
→ Docker Desktop'u kapat ve tekrar aç

#### Docker Container'ı durdurmak istersen:
```powershell
# Çalışan container'ı göster
docker ps

# Container'ı durdur
docker stop <CONTAINER_ID>

# Tüm container'ları durdur
docker stop $(docker ps -q)
```

---

### **Genel Hatalar**

#### Hata: "HTTP 405"
→ YouTube linkini kontrol et (sadece video URL'i, playlist parameter'i yok)

#### Hata: "HTTP 403 - Forbidden"
→ YouTube bot-detection engeli. User-Agent header eklenmiş, fakat YouTube politikası değişmişse, yt-dlp kütüphanesini güncellemek gerekebilir:
```powershell
npm install --upgrade youtube-dl-exec
```

#### Hiç çalışmadı?
→ Klasör yolunda Türkçe karakter var mı? Çıkar ve yeniden dene.

---

## � Proje Yapısı

```
ytmp3-local/
├── server.js           ← Ana sunucu (Express.js)
├── Dockerfile          ← Docker konteyner dosyası
├── package.json        ← Node.js bağımlılıklar
├── setup.bat           ← Windows otomasyonu
├── .gitignore          ← Git hariç tutulacak dosyalar
├── README.md           ← Bu dosya
├── bin/                ← (isteğe bağlı) Araç/executable'lar
└── public/             ← Web arayüzü
    ├── index.html      ← Sayfa HTML'i
    ├── app.js          ← JavaScript mantığı
    └── style.css       ← Tasarım
```

---

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

## 📄 **YASAL UYARILER VE KOŞULLAR**

### **YAZARLAR VE KÖK DEPOSİ SAHİPLERİ TARAFINDAN SORUMLULUK REDDİ:**

Bu proje **"OLDUĞU GİBİ"** (AS-IS) sağlanmaktadır. Hiçbir şekilde:

- ✋ **Yasallaştırma yapılmaz** - Bu araç yasaldır diye garanti verilmez
- ✋ **Telif hakkı garantisi verilmez** - Telif ihlali sizin sorumluluğunuz
- ✋ **DMCA koruması yok** - DMCA ihlali sizin sorumluluğunuz  
- ✋ **Platform politikası ihlal sorumluluğu yok** - YouTube ToS ihlal sizin sorumluluğunuz
- ✋ **Veri kaybı sorumluluğu yok** - Dosya kaybı veya bozulma durumunda sorumlu değiliz
- ✋ **Mali/cezai zarar sorumluluğu yok** - Yasal ceza veya para cezası durumunda sorumlu değiliz

### **BU PROJEYI NASIL KULLANACAĞINIZ:**

✅ **Yapabilirsiniz:**
- Kişisel koleksiyonunuzda olan müzik indirmek
- Sizin oluşturduğunuz içeriği MP3'e dönüştürmek
- Telif hakkı süresi dolan içerikleri indirmek
- Kayıtlı sahipten izin aldığınız içeriği indirmek

❌ **YAPMAYINIZ:**
- Telif haklı müzik/video indirmek
- Ticari amaçla kullanmak
- Platform şartlarını ihlal etmek
- Başkasının telif hakkıyla korunan içeriği indirmek

### **KİM SORUMLU DEĞİL:**

- Proje yazarları
- GitHub ve GitHub Inc.
- YouTube / Google
- Kütüphane geliştiricileri
- İşletim sistemi geliştiricileri

### **KİM SORUMLULAR:**

- 👉 **SİZ** - Bu aracı kullanmayı tercih eden kişi
- 👉 **SİZ** - İndirilen içeriğin yasal olup olmadığını kontrol eden kişi
- 👉 **SİZ** - Yasal sonuçlar ile karşılaşan kişi

### **YAZILIM LİSANSI:**

Bu proje MIT Lisansı altında yayınlanmaktadır, ancak **yasal kullanım bu lisans kapsamında değildir**. Lisans yazılımın koduna ilişkin olup, kullanım amacınıza ilişkin değildir.

---

**Son Düzenleme:** 22.06.2026  
**Disclaimer Versiyonu:** 1.0
