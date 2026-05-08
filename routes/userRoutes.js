const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

router.get("/profile", protect, async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected profile route",
        user: req.user
    });

});

router.get("/admin-only", protect, admin, async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome Admin"
    });

});

module.exports = router;