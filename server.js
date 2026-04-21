const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Food Analysis Endpoint
app.post('/analyze-food', async (req, res) => {
  const { foodItem } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Analyze the nutritional value of ${foodItem}` }],
    });
    res.json({ analysis: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Chatbot Endpoint
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
