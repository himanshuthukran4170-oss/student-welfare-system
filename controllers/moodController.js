const Mood = require("../models/Mood");

exports.addMood = async (req, res) => {
  try {
    const { userId, emoji, note } = req.body;

    const mood = new Mood({ userId, emoji, note });
    await mood.save();

    res.status(201).json({
      success: true,
      message: "Mood saved successfully",
      data: mood,
    });
  } catch (error) {
    console.error(error);   // 👈 VERY IMPORTANT
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};