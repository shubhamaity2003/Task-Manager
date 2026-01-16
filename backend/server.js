const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://task-manager-xc2j.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/user", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
