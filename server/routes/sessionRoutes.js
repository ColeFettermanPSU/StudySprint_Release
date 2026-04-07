const router = require("express").Router();
const Session = require("../models/Session");

router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { subject, minutes, notes } = req.body;

    if (!subject || !minutes) {
      return res.status(400).json({ message: "Subject and minutes are required" });
    }

    const newSession = new Session({
      subject,
      minutes,
      notes
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to save session" });
  }
});

module.exports = router;