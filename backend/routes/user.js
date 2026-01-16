const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("name email");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
