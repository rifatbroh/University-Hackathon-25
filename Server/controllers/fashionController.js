// controllers/fashionController.js
const OpenAI = require("openai");
require("dotenv").config({ path: __dirname + '/../openai.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getFashionTips = async (req, res) => {
  const { occasion, gender, season, budget } = req.body;

  try {
    const prompt = `Give a budget-friendly fashion tip for a ${gender} going to ${occasion} during ${season}. Budget level: ${budget}. Keep it under 100 words and practical.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const tips = response.choices[0].message.content.trim();
    res.json({ tips });
  } catch (error) {
    console.error("Fashion tip error:", error);
    res.status(500).json({ message: "Failed to generate fashion tip." });
  }
};
