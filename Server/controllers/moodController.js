const MoodEntry = require("../models/moodEntry");
const { OpenAI } = require("openai");
require('dotenv').config({ path: __dirname + '/../openai.env' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.checkInMood = async (req, res) => {
  try {
    const { mood, notes } = req.body;

    const entry = new MoodEntry({ mood, notes });
    await entry.save();

    res.status(201).json({ message: "Mood checked in successfully", entry });
  } catch (err) {
    res.status(500).json({ message: "Error checking in mood", error: err.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const moods = await MoodEntry.find({ user: "Hablu" }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching mood history", error: err.message });
  }
};

exports.ventChat = async (req, res) => {
  try {
    const { message } = req.body;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a kind, supportive friend helping someone process their feelings." },
        { role: "user", content: message }
      ],
      temperature: 0.8
    });

    const reply = chatResponse.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: "Error chatting with mood companion", error: err.message });
  }
};
