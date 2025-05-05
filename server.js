import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar o Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

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
              text: `
              Responda apenas baseado em fontes oficiais sobre o time de CS da FURIA a seguinte mensagem: ${message}
              observação: se a mensagem não for sobre o mundo de esports de counter strike, responda apenas a seguinte mensagem: "não fui programado para responder esse tipo de pergunta".
              `,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    let botReply = response.text() || 'Não consegui encontrar essa informação. Pode reformular?';
    botReply = botReply.replace(/\*+/g, '');

    res.json({ reply: botReply });

  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Erro ao acessar o sistema. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
