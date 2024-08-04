// ------ Imports ------ //

//Modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//Routes
import { authRoutes } from "./routes/index.js";

// ------ Setting Up ------ //
dotenv.config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});

app.use(express.json());

// ------ Setting Up Database ------ //

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err.message);
  });

// ------ Routes ------ //

//Test Route
app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// ------ Middleware ------ //

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
