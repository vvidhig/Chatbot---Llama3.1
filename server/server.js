// server.js
import express from 'express';
import cors from 'cors';
import { ChatOpenAI } from 'langchain';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const llama = new ChatOpenAI({
  model: "accounts/fireworks/models/llama-v3p1-405b-instruct",
  openai_api_key: process.env.FIREWORKS_API_KEY,
  openai_api_base: "https://api.fireworks.ai/inference/v1"
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await llama.invoke(message);
    res.json({ response: response.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});