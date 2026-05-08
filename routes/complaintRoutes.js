const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
    createComplaint,
    getComplaints,
    updateComplaintStatus,
    getMyComplaints,
    getComplaintStats,
    getCategoryStats,
    getMonthlyTrends
} = require("../controllers/complaintController");


router.post("/create", protect, createComplaint);
router.put(
    "/update/:id",
    protect,
    admin,
    updateComplaintStatus
);
router.get("/stats", protect, admin, getComplaintStats);
router.get("/all", protect, admin, getComplaints);
router.get("/my",protect,getMyComplaints);
router.get(
    "/stats/category",
    protect,
    admin,
    getCategoryStats
);
router.get(
    "/stats/monthly",
    protect,
    admin,
    getMonthlyTrends
);
module.exports = router;