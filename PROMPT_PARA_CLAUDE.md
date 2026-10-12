# 🎬 PROMPT PARA CLAUAR GERAR SEU PROJETO

## ⚠️ INSTRUÇÕES IMPORTANTES

1. **Copie TODO o texto abaixo**
2. **Cole no Claude (claude.ai)**
3. **Envie a mensagem**
4. **O Claude vai gerar TODO o projeto**
5. **Copie os arquivos que o Claude gerar**
6. **Cole na pasta do seu projeto**
7. **Pronto! Seu sistema está pronto**

---

## COMECE A COPIAR DAQUI:

```
===== COMEÇO DO PROMPT =====

Você é um especialista em desenvolvimento full-stack de software. Vou pedir para gerar um projeto completo de geração de vídeos UGC (User Generated Content) em alta qualidade.

REQUISITOS:
- Backend: Node.js + Express.js
- Frontend: HTML + JavaScript puro (SEM frameworks complexos)
- Database: SQLite (simples, sem servidor)
- Vídeos: FFmpeg para processamento
- Integração: APIs para Claude e OpenAI
- Qualidade: 1080p mínimo, 4K máximo

ARQUITETURA:

1. SERVIDOR BACKEND (Node.js)
   - Porta: 5000
   - API REST para:
     * /api/videos/create - Criar novo vídeo
     * /api/videos/list - Listar vídeos
     * /api/videos/:id - Detalhes do vídeo
     * /api/videos/:id/download - Baixar vídeo
     * /api/templates - Listar templates
     * /api/status/:jobId - Status do processamento
   
2. FRONTEND (HTML + JavaScript)
   - Dashboard simples e intuitivo
   - Formulário para criar vídeos
   - Galeria de vídeos gerados
   - Monitoramento de progresso em tempo real
   - Download de vídeos
   
3. PROCESSAMENTO DE VÍDEOS (Worker)
   - Fila de jobs
   - Processamento paralelo
   - Render com FFmpeg
   - Suporte para animações e efeitos
   
4. DATABASE (SQLite)
   - Tabelas para: videos, jobs, templates, users
   - Histórico de gerações
   - Status de processamento

FUNCIONALIDADES PRINCIPAIS:

✅ Criar vídeo com script/descrição
✅ Selecionar template (product_showcase, unboxing, review, etc)
✅ Escolher qualidade (720p, 1080p, 2k, 4k)
✅ Gerar com efeitos suaves (fade, zoom, pan)
✅ Sincronizar áudio e texto
✅ Renderizar em alta qualidade
✅ Baixar vídeo finalizado
✅ Ver histórico de vídeos
✅ Acompanhar progresso em tempo real
✅ Integração com APIs de IA

FAÇA O SEGUINTE:

1. Crie a estrutura de pastas:
   server/
   ├── server.js
   ├── config.js
   ├── database.js
   ├── routes/
   │   ├── videos.js
   │   ├── templates.js
   │   └── status.js
   ├── controllers/
   │   ├── videoController.js
   │   └── templateController.js
   ├── services/
   │   ├── videoService.js
   │   ├── renderService.js
   │   └── ffmpegService.js
   ├── workers/
   │   └── videoWorker.js
   ├── db.sqlite (será criado automaticamente)
   └── package.json
   
   public/
   ├── index.html
   ├── dashboard.html
   ├── css/
   │   └── style.css
   └── js/
       ├── main.js
       ├── api.js
       └── utils.js

2. Gere os arquivos:

   A) package.json - Com todas as dependências
   B) server.js - Servidor principal Express
   C) config.js - Configurações globais
   D) database.js - Inicialização SQLite
   E) routes/videos.js - Rotas para vídeos
   F) controllers/videoController.js - Lógica de vídeos
   G) services/videoService.js - Serviços de vídeo
   H) services/ffmpegService.js - Integração FFmpeg
   I) workers/videoWorker.js - Worker de processamento
   J) public/index.html - Dashboard HTML
   K) public/css/style.css - Estilos
   L) public/js/main.js - JavaScript frontend
   M) .env.example - Variáveis de ambiente
   N) README.md - Instruções
   O) install.sh - Script de instalação
   P) start.sh - Script para iniciar

3. Características dos arquivos:

   ✅ Código limpo e comentado
   ✅ Sem dependências complexas
   ✅ Fácil de entender
   ✅ Pronto para executar
   ✅ Tratamento de erros
   ✅ Logging de operações
   ✅ Validações de entrada
   ✅ Segurança básica
   ✅ Documentação inline
   ✅ Exemplos de uso

4. IMPORTANTE:
   - Código 100% funcional e testado
   - Sem erros de sintaxe
   - Sem dependências faltando
   - Pronto para rodar em qualquer máquina
   - Comentários em português
   - Instruções claras
   - Templates pré-configurados

5. TEMPLATES DISPONÍVEIS:
   - product_showcase: Apresentar produto
   - unboxing: Desempacotar
   - review: Fazer review
   - tutorial: Explicar uso
   - comparison: Comparar produtos
   - testimonial: Depoimento
   - lifestyle: Conteúdo de vida
   - demo: Demonstração

GERE TUDO ISSO AGORA!

Comece pelo package.json e vá gerando cada arquivo um por um.
Depois de cada arquivo, eu vou te dizer "próximo" e você gera o próximo.

Próximo!

===== FIM DO PROMPT =====
```

---

## ✅ O que fazer depois:

1. **Cole o prompt no Claude**
2. **Espere o Claude gerar package.json**
3. **Copie o código que o Claude gerou**
4. **Cole em um arquivo chamado `package.json` na pasta do projeto**
5. **Quando Claude terminar de gerar package.json, diga "próximo"**
6. **Repita para cada arquivo que Claude gerar**

## 📝 Dica de ouro:

Quando o Claude gerar um arquivo com bloco de código assim:

```javascript
// código aqui
```

Você copia TUDO que está dentro do bloco (sem as aspas de início e fim).
Depois cria um arquivo com esse nome e cola o código dentro.

## 🚀 Sequência correta:

1. package.json
2. server.js
3. config.js
4. database.js
5. routes/videos.js
6. controllers/videoController.js
7. services/videoService.js
8. services/ffmpegService.js
9. workers/videoWorker.js
10. public/index.html
11. public/css/style.css
12. public/js/main.js
13. .env.example
14. start.sh / install.sh
15. README.md

## 💾 Depois que tudo estiver pronto:

```bash
# 1. Instale as dependências
npm install

# 2. Copie o .env.example e renomeie para .env
cp .env.example .env

# 3. Inicie o servidor
npm start

# 4. Acesse no navegador
http://localhost:5000
```

---

**Tá pronto? Então vá para o Claude agora e comece! 🚀**
