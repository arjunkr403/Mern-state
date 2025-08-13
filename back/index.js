import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // Allow JSON as the input
app.use(cookieParser());

//Configure CORS
app.use(cors({
  origin: ["https://homeheaven-h3kv.onrender.com",
    "http://localhost:5174"], // frontend URL
  credentials: true // if you send cookies or auth headers
}));



// Serve API routes
app.use("/back/user", userRouter);
app.use("/back/auth", authRouter);
app.use("/back/listing", listingRouter);


// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
