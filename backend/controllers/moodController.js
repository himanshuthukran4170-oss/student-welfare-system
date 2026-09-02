const Mood = require("../models/Mood");

exports.addMood = async (req, res) => {

    });
  } catch (error) {
    console.error(error);   // 👈 VERY IMPORTANT
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
