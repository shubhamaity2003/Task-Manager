const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  app: { type: String, default: "task-manager" }
});


module.exports = mongoose.model("User", userSchema);
