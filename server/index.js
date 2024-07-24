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
    const result = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Based on these answers: ${JSON.stringify(answers)}, suggest products from this list: ${JSON.stringify(products)}. Only give the ids of Product Thanks ! Keep your responses in the format: ProductId1, ProductId2, ProductId3.... and please dont write extra text such that I will suggest etc. Make sure to only provide the product ids.If my answers are empty set you may return 3, 8, 47 , 20 , 12 ,24. Good luck! You must atleast give me 6 ids`,
        }
      ],
      model: 'llama3-8b-8192'
    });

    const suggestedProductIds = result.choices[0]?.message.content;
    console.log('Suggested products:', suggestedProductIds);
    res.json({ suggestedProductIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/summary', async (req, res) => {
  const answers = req.body;
  try {
    const result = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Based on these answers: ${JSON.stringify(answers)}, provide a brief 2.5 line summary of the products a child might like from this list: ${JSON.stringify(products)}.Start  your summary with 'Child will like...'. Good luck! dont add extra text above it `,
        }
      ],
      model: 'llama3-8b-8192'
    });

    const summary = result.choices[0]?.message.content;
    console.log('Summary:', summary);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
