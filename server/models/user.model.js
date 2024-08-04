// ------ Importing the necessary modules ------ //
import mongoose from "mongoose";

// ------ Creating the user schema ------ //
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    avatar: {
      type: String,
      default: "https://i.sstatic.net/l60Hf.png",
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
