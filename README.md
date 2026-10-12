# 🎬 Gerador de Vídeos UGC

Gera vídeos curtos estilo UGC (texto animado, zoom/pan, fades, narração opcional) a partir de um roteiro.
**Node.js + Express · SQLite · FFmpeg · HTML/JS puro.**

## Requisitos
- Node.js 18+ (testado no 22)
- FFmpeg 5+ com `drawtext` (inclui `ffprobe`)
- Uma fonte TTF (Linux: `fonts-dejavu-core`; macOS já tem Arial)

## Instalação e uso
```bash
./install.sh     # checa Node/FFmpeg, instala npm, cria server/.env
./start.sh       # sobe em http://localhost:5000
```
Opcional: edite `server/.env` e coloque `ANTHROPIC_API_KEY` (divide o roteiro em cenas com Claude) e/ou `OPENAI_API_KEY` (narração TTS + alternativa de divisão). **Sem chaves tudo funciona**, com divisão local por frases e vídeo sem voz.

## Estrutura
```
server/    server.js, config.js, database.js, routes/, controllers/, services/, workers/
public/    index.html (criar + galeria), dashboard.html (histórico), css/, js/
server/data/   (criada sozinha) db.sqlite, videos/, tmp/
```

## API
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/videos/create` | Cria vídeo e enfileira o job (202) |
| GET | `/api/videos/list?page=1&limit=20&status=completed` | Lista + estatísticas |
| GET | `/api/videos/:id` | Detalhes |
| GET | `/api/videos/:id/download` | Baixa o MP4 (`?inline=1` para tocar no navegador) |
| DELETE | `/api/videos/:id` | Remove vídeo e arquivo |
| GET | `/api/templates` | Templates + opções do formulário |
| GET | `/api/status/:jobId` | Progresso, etapa e log do job |

### Exemplo
```bash
curl -X POST localhost:5000/api/videos/create -H 'content-type: application/json' -d '{
  "title": "Garrafa Térmica Pro",
  "script": "Você precisa conhecer essa garrafa. Ela mantém a bebida gelada por 24 horas. Garanta a sua agora!",
  "template": "product_showcase",
  "quality": "1080p",
  "aspect": "9:16",
  "useAI": true,
  "useVoice": false
}'
# → {"video":{...},"job":{"jobId":"<id>",...}}

curl localhost:5000/api/status/<id>          # acompanha o progresso
curl -OJ localhost:5000/api/videos/<videoId>/download
```

Campos: `template` (product_showcase, unboxing, review, tutorial, comparison, testimonial, lifestyle, demo) · `quality` (720p, 1080p, 2k, 4k) · `aspect` (9:16, 16:9, 1:1).

Resoluções (9:16): 720p = 720×1280 · 1080p = 1080×1920 · 2k = 1440×2560 · 4k = 2160×3840.

## Como funciona
1. A API grava vídeo + job no SQLite (`queued`).
2. O worker pega jobs da fila (até `MAX_CONCURRENT_JOBS` em paralelo; a fila sobrevive a reinícios).
3. Roteiro → cenas (Claude/OpenAI/local) → narração opcional → um clipe FFmpeg por cena → concatenação.
4. O frontend consulta `/api/status/:jobId` a cada 1,5 s.

## Problemas comuns
- **Texto não aparece:** FFmpeg sem `drawtext` ou sem fonte. Defina `FONT_FILE` no `.env`.
- **4K lento / pouca memória:** reduza `MAX_CONCURRENT_JOBS=1` e use `X264_PRESET=veryfast`.
- **Porta em uso:** mude `PORT` no `.env`.
- **Erro ao instalar `better-sqlite3`:** instale as ferramentas de build (`sudo apt install build-essential python3`) e rode `./install.sh` de novo.

## Segurança básica incluída
Helmet (cabeçalhos), limite de tamanho do JSON, rate limit na criação, validação de todas as entradas, IDs UUID validados (sem path traversal), texto do usuário escapado no frontend e nunca interpretado pelo FFmpeg (vai por arquivo com `expansion=none`). **Não há login**: não exponha a porta diretamente na internet sem um proxy com autenticação.
