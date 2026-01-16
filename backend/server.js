const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS FIX (works for local + Vercel)
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // allow all origins
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/user", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
