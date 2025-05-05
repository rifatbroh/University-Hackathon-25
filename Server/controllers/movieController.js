// controllers/movieController.js
const OpenAI = require("openai");
require("dotenv").config({ path: __dirname + '/../openai.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getMovieSuggestion = async (req, res) => {
  const { mood, genre, duration } = req.body;

  const prompt = `Suggest a movie that matches the mood: "${mood}", genre: "${genre}", and duration: "${duration}". Keep the suggestion short, under 60 words, and recommend only one movie.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const suggestion = response.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error("Movie suggestion error:", error);
    res.status(500).json({ message: "Failed to generate movie suggestion." });
  }
};
