const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const moodRoutes = require("./routes/moodRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("server is running");
});

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});