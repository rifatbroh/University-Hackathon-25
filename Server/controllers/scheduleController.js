const Schedule = require('../models/Schedule');
const nodemailer = require('nodemailer');
require("dotenv").config(); // Load .env

// email setup (e.g., Gmail SMTP or ethereal for dev)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.createSchedule = async (req, res) => {
  try {
    const { title, description, startTime, endTime, participants } = req.body;

    const newSchedule = new Schedule({
      title,
      description,
      startTime,
      endTime,
      participants,
    });

    await newSchedule.save();

    // send invite emails
    participants.forEach(email => {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: `Study Session Invite: ${title}`,
        text: `You've been invited to a study session by Hablu!\n\nTitle: ${title}\nStart: ${startTime}\nEnd: ${endTime}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('Error sending email to', email, err);
      });
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ startTime: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting schedule', error });
  }
};
