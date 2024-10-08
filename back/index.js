import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // Allow JSON as the input
app.use(cookieParser());

// Serve API routes
app.use("/back/user", userRouter);
app.use("/back/auth", authRouter);
app.use("/back/listing", listingRouter);

// Serve static files from the "front/dist" directory
app.use(express.static(path.join(__dirname, "front", "dist")));

// Serve the index.html file for all remaining routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"));
});

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
