# 📋 Guia de Configuração Completo

## Para Iniciantes (Passo a Passo)

### Requisitos do Sistema
- Windows, Mac ou Linux
- Node.js 16+ instalado
- FFmpeg instalado
- Conexão com internet

### Instalação Node.js

**Windows:**
1. Vá em https://nodejs.org
2. Baixe a versão LTS
3. Execute o instalador
4. Clique "Next" em tudo
5. Termine

**Mac:**
```bash
# Com Homebrew
brew install node

# Ou baixe em https://nodejs.org
```

**Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Instalação FFmpeg

**Windows:**
1. Vá em https://ffmpeg.org/download.html
2. Baixe a versão Windows
3. Extraia em `C:\ffmpeg`
4. Adicione ao PATH

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg
```

### Verificar Instalação

```bash
# Verificar Node.js
node --version

# Verificar NPM
npm --version

# Verificar FFmpeg
ffmpeg -version
```

Todos devem retornar versões. Se não funcionar, instale novamente.

---

## Configuração do Projeto

### 1. Clone o Repositório
```bash
git clone https://github.com/xpfelipe8/ugc-video-generator.git
cd ugc-video-generator
```

### 2. Instale Dependências
```bash
npm install
```

Isso vai baixar e instalar tudo necessário (~5-10 minutos).

### 3. Crie o Arquivo .env

Copie `env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

Depois abra o arquivo `.env` e configure:

```
NODE_ENV=development
PORT=5000
FFMPEG_PATH=/usr/bin/ffmpeg
```

### 4. Inicie o Servidor
```bash
npm start
```

Você deve ver:
```
✅ Servidor rodando em http://localhost:5000
✅ Database inicializado
✅ Pronto para gerar vídeos!
```

### 5. Acesse o Dashboard
Abra seu navegador em: **http://localhost:5000**

Você verá a interface para criar vídeos.

---

## Troubleshooting

### Erro: "npm not found"
**Solução:** Node.js não foi instalado corretamente. Reinstale.

### Erro: "FFmpeg not found"
**Solução:** Configure o caminho correto no `.env`
- Windows: `C:\ffmpeg\bin\ffmpeg.exe`
- Mac/Linux: `/usr/bin/ffmpeg`

### Erro: "Port 5000 already in use"
**Solução:** Mude a porta no `.env`:
```
PORT=5001
```

### Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente

### Vídeo não renderiza
**Solução:**
1. Verifique se FFmpeg está instalado
2. Tente com qualidade menor (720p)
3. Reduza a duração do vídeo

---

## Configurações Avançadas

### Aumentar Qualidade
No `.env`, mude:
```
DEFAULT_QUALITY=4k
DEFAULT_FRAMERATE=60
```

### Aumentar Velocidade de Processamento
```
WORKER_THREADS=4
MAX_PARALLEL_JOBS=4
```

### Aumentar Tamanho Máximo de Arquivo
```
MAX_FILE_SIZE=10000
```

---

## Primeiros Testes

### Teste 1: Verificar Servidor
```bash
curl http://localhost:5000
```

Deveria retornar a página HTML.

### Teste 2: Gerar Vídeo Simples
1. Vá para http://localhost:5000
2. Preencha:
   - Título: "Meu Primeiro Vídeo"
   - Script: "Olá, este é um teste"
   - Template: "product_showcase"
   - Qualidade: "720p"
3. Clique "Gerar"
4. Aguarde 1-5 minutos

### Teste 3: Usar Claude
1. Vá para https://claude.ai
2. Cole este prompt:

```
Gere um vídeo UGC usando esta API:
URL: http://localhost:5000/api/videos/create

Quero um vídeo curto (15 segundos) sobre um fone bluetooth.
Template: product_showcase
Qualidade: 1080p
```

---

## Próximos Passos

✅ Servidor configurado
✅ FFmpeg funcionando
✅ Primeiro vídeo gerado

Agora:
1. Explore os templates
2. Gere mais vídeos
3. Customize a interface
4. Integre com suas ferramentas

---

**Está tudo funcionando? Ótimo! Comece a criar vídeos! 🎬**
