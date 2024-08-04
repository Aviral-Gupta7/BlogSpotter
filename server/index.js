// ------ Imports ------ //

//Modules
import express from "express";
import dotenv from "dotenv";

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

// ------ Routes ------ //

//Test Route
app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

// Auth Routes
app.use("/api/auth", authRoutes);
