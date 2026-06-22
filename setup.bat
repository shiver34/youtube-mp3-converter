@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   YouTube MP3 Dönüştürücü - Kurulum Başlıyor
echo ================================================
echo.

echo [1/3] Node.js kontrol ediliyor...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ HATA: Node.js yüklü değil!
    echo.
    echo Node.js indir: https://nodejs.org/
    echo Indir ve Kur, sonra bu dosyayı tekrar çalıştır.
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js yüklü

echo.
echo [2/3] Paketler yükleniyor... (Bu 1-2 dakika sürebilir)
call npm install
if errorlevel 1 (
    echo.
    echo ❌ npm install başarısız!
    pause
    exit /b 1
)
echo ✅ Paketler yüklendi

echo.
echo [3/3] Sunucu başlatılıyor...
echo.
echo ================================================
echo   ✅ SUNUCU BAŞLADI!
echo.
echo   🌐 Tarayıcıda Aç:
echo      http://localhost:3000
echo.
echo   Uygulamayı kapatmak için: CTRL + C
echo ================================================
echo.

call node server.js
pause
