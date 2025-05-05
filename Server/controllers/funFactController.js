const OpenAI = require("openai");
require('dotenv').config({ path: __dirname + '/../openai.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getFunFact = async (req, res) => {
  try {
    const prompt = "Give me one short and interesting random fun fact (max 40 words). Make it surprising and engaging.";

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "o4-mini" if available
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const funFact = chatResponse.choices[0].message.content.trim();
    res.status(200).json({ fact: funFact });

  } catch (error) {
    console.error("Error fetching fun fact:", error);
    res.status(500).json({ message: "Error generating fun fact.", error });
  }
};
