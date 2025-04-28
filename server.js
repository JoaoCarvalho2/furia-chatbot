import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar o Gemini com a API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // Verificar se o usuário está perguntando sobre FURIA ou CS
  /*if (!/(furia|cs|counter[-\s]?strike|partida|jogo|próximo jogo|próxima partida|line[-\s]?up|time|elenco|próximo adversário)/i.test(message)) {
    return res.json({ reply: 'Desculpe, só posso responder perguntas sobre o time de CS da FURIA! 🐺' });
  } */
  

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", 
      tools: [{ googleSearch: {} }],
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Responda apenas baseado em fontes oficiais sobre o time de CS da FURIA: ${message}`,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const botReply = response.text() || 'Não consegui encontrar essa informação. Pode reformular?'
    .replace(/\*{1,2}/g, '');

    res.json({ reply: botReply });

  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Erro ao acessar o sistema. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
