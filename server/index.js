const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Groq = require('groq-sdk');
const products = require('./products.json'); 

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

const groq = new Groq({
  apiKey: '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',
});

app.post('/suggest-products', async (req, res) => {
  const answers = req.body;
  try {
    // Send answers to AI for processing
    const result = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Based on these answers: ${JSON.stringify(answers)}, suggest products from this list: ${JSON.stringify(products)}. Only give the ids of Product Thanks ! Keep your responses in the format: ProductId1, ProductId2, ProductId3.... and please dont write extra text such that I will suggest etc. Make sure to only provide the product ids.`,
        }
      ],
      model: 'llama3-8b-8192'
    });

    // Assuming AI response contains suggested product IDs
    const suggestedProductIds = result.choices[0]?.message.content;
    console.log('Suggested products:', suggestedProductIds);
    res.json({ suggestedProductIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
