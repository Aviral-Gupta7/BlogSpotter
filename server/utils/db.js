import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(console.log("Connected to DB"))
    .catch((err) => {
      console.log(err);
    });
};
