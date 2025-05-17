const readline = require('readline');
const colors = require('colors');
require('dotenv').config();
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.gemini_token);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let conversationContexts = [];
let chat;

const title = `
  /$$$$$$  /$$$$$$        /$$$$$$  /$$       /$$$$$$      
 /$$__  $$|_  $$_/       /$$__  $$| $$      |_  $$_/      
| $$   \ $$  | $$        | $$   \__/| $$        | $$        
| $$$$$$$$  | $$ /$$$$$$| $$      | $$        | $$        
| $$__  $$  | $$|______/| $$      | $$        | $$        
| $$  | $$  | $$        | $$    $$| $$        | $$        
| $$  | $$ /$$$$$$      |  $$$$$$/| $$$$$$$$ /$$$$$$      
|__/  |__/|______/       \______/ |________/|______/      
                                                    
`.red;


/**
 * Função principal do principal do programa, recebe o prompt do usuário e chama a função
 * GenerativeAI para gerar o texto. Caso o prompt seja nulo, limpa a tela,
 * imprime o titulo e pergunta o prompt para o usuário.
 * @param {string} [prompt] - O texto que ir  ser usado para gerar o texto.
 * @returns {void}
 */
async function init(prompt) {
 
if (!prompt) {
    console.clear();
    console.log(title);

    rl.question(`[${colors.green('+')}] Prompt: `, async (prompt) => {
        try {
       const response = await GenerativeAI(prompt);

        console.log(response);
        rl.question(`[${colors.green('+')}] Prompt: `, async (prompt) => {
            init(prompt);
        })
        } catch {

        }
    })
} else {
       const response = await GenerativeAI(prompt);
       console.log(response);
    rl.question(`[${colors.green('+')}] Prompt: `, async (prompt) => {
        init(prompt);
    })
}
}


/**
 * Função que chama a API do Google Generative AI para gerar o texto com base
 * no prompt passado.
 * @param {string} prompt - O texto que ir  ser usado para gerar o texto.
 * @returns {Promise<string>} Um texto gerado com base no prompt.
 * @throws {Error} Caso o prompt seja nulo, lan a um erro.
 */
async function GenerativeAI(prompt) {
  try {
    const safetySettings = [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ];

    const generationConfig = {
      maxOutputTokens: 750,
      temperature: 1.5
    };

    if (!chat) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp", safetySettings, generationConfig });
      chat = model.startChat({
        history: conversationContexts,
        generationConfig: { maxOutputTokens: 8000, temperature: 0.5 },
      });
    }

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    conversationContexts.push(
      { role: "user", parts: [{ text: prompt }] },
      { role: "model", parts: [{ text: response.text() }] }
    );

    return "\n[" + colors.blue("IA") + "] " + response.text();
  } catch (error) {
    console.error(error);
  }
}


init();