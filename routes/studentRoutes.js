const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createStudent,
    getAllStudents,
    deleteStudent,
    updateStudent
} = require("../controllers/studentController");

router.post("/create", protect, createStudent);

router.get("/all", protect, getAllStudents);

router.put("/update/:id", protect, updateStudent);

router.delete("/delete/:id", protect, deleteStudent);
module.exports = router;