import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});

//TEST ROUTE
app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});
