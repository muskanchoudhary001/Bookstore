import express from "express";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
import conn from "./connection/connection.js"
import userRoutes from "./routes/userRoutes.js";

const app = express();

//connect DB
conn()

// Middleware
app.use(express.json());

//user signin and signup routes
app.use("/api/v1/users",userRoutes);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from backend server 🚀",
  });
});

// Better Port Handling
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});