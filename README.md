# UGC Video Generator - Sistema de Geração de Vídeos

## 🎬 O que é?

Sistema completo para gerar vídeos UGC (User Generated Content) em alta qualidade HD, com:
- ✅ Motion Control (movimento suave de câmera)
- ✅ Animações profissionais
- ✅ Texto e áudio sincronizados
- ✅ Composição visual premium
- ✅ Renderização em qualidade 1080p/4K
- ✅ Integração com Claude AI

## 🚀 Como usar

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/xpfelipe8/ugc-video-generator.git
cd ugc-video-generator
```

### Passo 2: Instalar dependências
```bash
npm install
```

### Passo 3: Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```
DATABASE_URL=postgresql://user:password@localhost:5432/ugc_db
REDIS_URL=redis://localhost:6379
CLAUDE_API_KEY=sua_chave_aqui
OPENAI_API_KEY=sua_chave_aqui
FFMPEG_PATH=/usr/bin/ffmpeg
NODE_ENV=development
```

### Passo 4: Iniciar com Docker
```bash
docker-compose up -d
```

### Passo 5: Acessar o painel
- URL: http://localhost:3000
- Login padrão: admin / admin123

## 📁 Estrutura de pastas

```
ugc-video-generator/
├── backend/              # API Python (FastAPI)
├── frontend/            # Interface Next.js
├── worker/              # Processamento de vídeos
├── services/            # Serviços principais
├── docker-compose.yml   # Configuração Docker
├── .env.example         # Template de variáveis
└── docs/               # Documentação completa
```

## 🎯 Como gerar um vídeo

### Opção 1: Via Interface Web
1. Acesse http://localhost:3000
2. Clique em "Novo Vídeo"
3. Preencha o script ou descrição
4. Escolha template e estilo
5. Clique em "Gerar"
6. Aguarde o processamento

### Opção 2: Via API
```bash
curl -X POST http://localhost:3000/api/videos/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Vídeo UGC",
    "script": "Descrição do produto incrível",
    "template": "product_showcase",
    "quality": "1080p"
  }'
```

### Opção 3: Via Claude (Recomendado)
1. Abra o Claude
2. Cole este prompt:
```
Você é um gerador de vídeos UGC. Use este sistema:

API_URL: http://localhost:3000/api

Para criar um vídeo, faça uma requisição POST para:
/api/videos/create

Com os parâmetros:
- title: Título do vídeo
- script: Roteiro ou descrição
- template: Tipo de vídeo (product_showcase, unboxing, review, etc)
- quality: Qualidade (720p, 1080p, 4k)
- duration: Duração em segundos

Gere vídeos profissionais baseado no que o usuário pedir.
```

## 📊 Exemplos de uso

### Exemplo 1: Vídeo de Produto
```
Claude, gere um vídeo UGC mostrando um fone bluetooth premium,
com motion control suave, duração 30 segundos, 1080p
```

### Exemplo 2: Unboxing
```
Quero um vídeo unboxing de um smartwatch em alta qualidade,
com efeitos de transição suave, duração 45 segundos
```

### Exemplo 3: Review
```
Gere um vídeo review de uma câmera profissional,
com detalhe de recursos, animações de texto, 60 segundos, 4k
```

## 🎨 Templates disponíveis

- `product_showcase` - Apresentação de produto
- `unboxing` - Desempacotamento
- `review` - Análise de produto
- `tutorial` - Tutorial de uso
- `comparison` - Comparação de produtos
- `testimonial` - Depoimento
- `lifestyle` - Estilo de vida
- `demo` - Demonstração

## 🔧 Recursos avançados

### Motion Control
- Zoom in/out suave
- Pan horizontal/vertical
- Rotação 3D
- Efeitos de câmera dinâmica

### Animações
- Fade in/out
- Slide
- Bounce
- Scale
- Rotate

### Áudio
- Text-to-speech sincronizado
- Música de fundo
- Efeitos sonoros
- Voice over customizado

### Qualidade
- 720p Standard
- 1080p Full HD
- 2K Enhanced
- 4K Ultra HD

## 📚 Documentação completa

Veja em `docs/` para:
- Guia de instalação detalhado
- API reference completa
- Exemplos de código
- Troubleshooting
- FAQ

## 💡 Dicas importantes

1. **Comece com templates** - Mais fácil e rápido
2. **Use Claude para tudo** - Ele entende os parâmetros
3. **Qualidade > Velocidade** - Espere render completo
4. **Salve seus vídeos** - Estão em `outputs/`
5. **Customize conforme necessário** - Os templates são flexíveis

## 🆘 Problemas comuns

**P: Vídeo não gera**
R: Verifique se o Docker está rodando e banco de dados conectado

**P: Qualidade ruim**
R: Aumente a qualidade em `quality: '4k'` na requisição

**P: Áudio dessincronizado**
R: Use a opção `sync_audio: true` na API

**P: Efeitos lentos**
R: Reduza efeitos ou qualidade temporariamente

## 📞 Suporte

Tem dúvidas? Abra uma issue ou use o Claude para debugar!

## 📄 Licença

MIT License - Use livremente

---

**Próximo passo**: Copie o PROMPT_PARA_CLAUDE.md no Claude e comece a gerar vídeos!
