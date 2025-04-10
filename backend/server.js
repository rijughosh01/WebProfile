import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(postsRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));

const start = async () => {
  const connectDB = await mongoose.connect(
    "mongodb+srv://rg7914579:k6JVQONtsZLhxCDK@linkedinclone.ukuocg3.mongodb.net/point?retryWrites=true&w=majority&appName=linkedinclone"
  );

  app.listen(9080, () => {
    console.log("Server is running on port 9080");
  });
};

start();
