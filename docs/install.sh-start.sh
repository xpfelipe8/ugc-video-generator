#!/usr/bin/env bash
# install.sh — Instala dependências do Gerador de Vídeos UGC
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Verificando Node.js (precisa ser >= 18)..."
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js não encontrado. Instale em https://nodejs.org (versão LTS)."; exit 1
fi
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "Node.js $(node -v) é antigo demais. Atualize para 18 ou superior."; exit 1
fi
echo "    Node $(node -v) OK"

echo "==> Verificando FFmpeg..."
if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "FFmpeg não encontrado. Instale com:"
  echo "    Ubuntu/Debian: sudo apt update && sudo apt install -y ffmpeg fonts-dejavu-core"
  echo "    macOS:         brew install ffmpeg"
  exit 1
fi
echo "    $(ffmpeg -version | head -1)"
if ! ffmpeg -hide_banner -filters 2>/dev/null | grep -q drawtext; then
  echo "AVISO: seu FFmpeg não tem o filtro 'drawtext' (libfreetype). O texto não aparecerá nos vídeos."
  echo "       No macOS use: brew install ffmpeg (versão completa)."
fi

echo "==> Instalando dependências npm..."
(cd server && npm install --no-audit --no-fund --no-package-lock)

if [ ! -f server/.env ]; then
  cp server/.env.example server/.env
  echo "==> Arquivo server/.env criado. Edite para colocar suas chaves de IA (opcional)."
fi

chmod +x start.sh
echo
echo "Pronto! Inicie com: ./start.sh   e abra http://localhost:5000"
