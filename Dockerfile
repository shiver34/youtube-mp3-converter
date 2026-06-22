FROM node:18-bookworm

# FFmpeg ve gerekli araçları kur
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# yt-dlp'yi pip ile kur
RUN pip install --no-cache-dir --break-system-packages yt-dlp

WORKDIR /app

# Dosyaları kopyala
COPY . .

# Node bağımlılıklarını yükle
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
