require("dotenv").config();
const express = require("express");
const connectdb = require("./configure/db");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://cosmic-meringue-b435c3.netlify.app",
  credentials: true
}));

// Routes
app.use("/api", authRouter);

// Start server
app.listen(PORT, async () => {
  await connectdb();
  console.log(`Server running on port ${PORT}`);
});