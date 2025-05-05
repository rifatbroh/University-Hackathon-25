// controllers/resumeController.js
const OpenAI = require("openai");
require("dotenv").config({ path: __dirname + '/../openai.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getResumeTips = async (req, res) => {
  const { careerGoal, experienceLevel } = req.body;

  try {
    const prompt = `Give 3 resume tips for an ${experienceLevel} candidate targeting a career as a ${careerGoal}. Be concise and practical.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const tips = response.choices[0].message.content.trim();
    res.json({ tips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch resume tips.", error });
  }
};
