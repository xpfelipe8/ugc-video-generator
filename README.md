# 🎬 Gerador de Vídeos UGC

Gera vídeos curtos estilo UGC (texto animado, zoom/pan, fades, narração opcional) a partir de um roteiro.
Aceita **fotos e clipes do produto** como fundo, **legendas palavra por palavra** (estilo TikTok), **música de fundo** (trilhas prontas ou a sua) e tem **login + API key**.
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

## Novidades (v2)
| Recurso | Como usar |
|---|---|
| Fotos/clipes do produto | No formulário, envie JPG/PNG/WebP/MP4/MOV/WebM e clique para selecionar (o número mostra a ordem). As cenas usam as mídias em rodízio; clipes mostram trechos diferentes a cada cena. Sem mídia, usa gradiente. |
| Legendas palavra por palavra | Campo "Legendas" → *Palavra por palavra*. Mostra 2 palavras por vez com contorno e alterna branco/cor do template. O tempo de cada palavra é **estimado** pelo tamanho do texto (não há sincronia exata com a voz). |
| Música de fundo | Trilhas sintéticas prontas (*Calma* e *Animada*, geradas pelo FFmpeg, livres de direitos) ou envie MP3/WAV/M4A/OGG/FLAC. Se houver narração, a música abaixa sozinha enquanto a voz fala. |
| Login + API key | Defina `AUTH_PASSWORD` (painel) e/ou `API_KEY` (automações) no `.env`. Sem isso, o painel fica aberto (uso local). |

## Estrutura
```
server/    server.js, config.js, database.js, logger.js, routes/, controllers/, services/, workers/, middleware/
public/    index.html (criar + galeria), dashboard.html (histórico), login.html, css/, js/
server/data/   (criada sozinha) db.sqlite, videos/, uploads/, tmp/
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
| POST | `/api/assets/upload` | Envia uma mídia (corpo = bytes do arquivo; cabeçalho `X-Filename`) |
| GET | `/api/assets?kind=image\|video\|audio` | Lista a biblioteca de mídias |
| GET | `/api/assets/:id/file` | Baixa/pré-visualiza a mídia |
| DELETE | `/api/assets/:id` | Remove a mídia (bloqueado se estiver em uso por um vídeo na fila) |
| POST | `/api/auth/login` · `/api/auth/logout` · GET `/api/auth/me` | Sessão do painel |

Com autenticação ligada, envie `-H 'X-API-Key: <sua chave>'` em todas as chamadas `/api/*` (exceto `/api/health` e `/api/auth/*`).

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

Campos novos opcionais: `assets` (lista de ids de mídias), `captionStyle` (`block` | `words`), `music` (`preset:calm` | `preset:upbeat` | `asset:<id>`), `musicVolume` (0-100).

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
Helmet (cabeçalhos), limite de tamanho do JSON, rate limit na criação, validação de todas as entradas, IDs UUID validados (sem path traversal), texto do usuário escapado no frontend e nunca interpretado pelo FFmpeg (vai por arquivo com `expansion=none`). Uploads validados pelo conteúdo real do arquivo (não pelo nome/Content-Type) e conferidos com ffprobe; login com cookie HttpOnly assinado (HMAC), comparação de senha em tempo constante e limite de tentativas. **Com `AUTH_PASSWORD` vazio não há login**: ligue a autenticação antes de expor a porta na internet e use HTTPS (`COOKIE_SECURE=true`).
