const Skill = require('../models/Skill');
const { OpenAI } = require("openai");
require('dotenv').config({ path: __dirname + '/../openai.env' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const interestSkillMap = {
  "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  "UI/UX": ["Figma", "Wireframing", "Design Principles"],
  "Public Speaking": ["Storytelling", "Body Language", "Presentation Design"]
};

// POST: Save interests
exports.saveInterests = async (req, res) => {
  try {
    const { interests } = req.body;
    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests must be an array.' });
    }

    // Save to DB
    const skill = new Skill({ interests });
    await skill.save();

    res.status(201).json({ message: 'Interests saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving interests.', error });
  }
};

// GET: Suggest skills based on saved interests
exports.getSuggestions = async (req, res) => {
  try {
    const latest = await Skill.findOne().sort({ createdAt: -1 }); // Only 1 user = Hablu

    if (!latest || !latest.interests) {
      return res.status(404).json({ message: 'No interests found.' });
    }

    const suggestions = new Set();
    latest.interests.forEach(interest => {
      const skills = interestSkillMap[interest];
      if (skills) skills.forEach(skill => suggestions.add(skill));
    });

    res.json({ suggestions: Array.from(suggestions) });
  } catch (error) {
    res.status(500).json({ message: 'Error generating suggestions.', error });
  }
};

exports.getDailySkillTip = async (req, res) => {
    try {
      const latest = await Skill.findOne().sort({ createdAt: -1 });
  
      if (!latest || !latest.interests) {
        return res.status(404).json({ message: 'No interests found to generate tip.' });
      }
  
      const interestsStr = latest.interests.join(', ');
      const prompt = `Provide a short, practical daily tip or mini-lesson (max 100 words) for someone interested in: ${interestsStr}.`;
  
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });
  
      const response = chatResponse.choices[0].message.content.trim();
      res.json({ tip: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating daily skill tip.", error });
    }
};
