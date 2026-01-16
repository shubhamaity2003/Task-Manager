const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
