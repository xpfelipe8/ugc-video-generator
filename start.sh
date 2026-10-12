#!/usr/bin/env bash
# start.sh — Inicia o servidor
set -euo pipefail
cd "$(dirname "$0")/server"

if [ ! -d node_modules ]; then
  echo "Dependências não instaladas. Rodando install.sh..."
  ../install.sh
fi
[ -f .env ] || cp .env.example .env

echo "Iniciando em http://localhost:${PORT:-5000}  (Ctrl+C para parar)"
exec node server.js
