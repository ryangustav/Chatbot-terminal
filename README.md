# 🤖 Gemini CLI Chat

Um chatbot simples feito em Node.js que se comunica com a API do **Google Gemini** direto pelo terminal. Feito para diversão, aprendizado e para usar como base em projetos maiores.

---

## 📸 Demonstração

![Captura de tela 2025-05-17 201611](https://github.com/user-attachments/assets/c98edf75-7f66-4788-9934-dd179ff5ab93)

---

## 🚀 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/ryangustav/Chatbot-terminal.git
cd Chatbot-terminal
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto com seu token da API do Google:

```
gemini_token=SEU_TOKEN_AQUI
```

### 4. Execute o bot

```bash
node index.js
```

---

## ✨ Recursos

* Interface em linha de comando (CLI)
* Histórico de conversa com o modelo
* Cores no terminal para melhor visualização
* API Google Generative AI (Gemini)
* Prompt contínuo (não precisa reiniciar o app a cada pergunta)

---

## ⚠️ Requisitos

* Node.js v18+
* Token da API do [Google Generative AI](https://aistudio.google.com/apikey)

---

## 📂 Estrutura básica

```
gemini-cli-chat/
├── index.js         # Código principal do bot
├── .env             # Token da API
├── package.json
├── README.md
└── .gitignore
```

---

## 📝 Licença

Este projeto foi feito para fins educacionais e pessoais. Sinta-se à vontade para clonar, modificar e usar como quiser.

---
