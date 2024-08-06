// ------ Importing the necessary modules ------ //
import mongoose from "mongoose";
import Joi from "joi";

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
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer not to say"],
      default: "prefer not to say",
      required: true,
    },
    emailVerification: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["user", "seller", "admin", "owner"],
      default: "user",
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

export const validateUserSchema = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    gender: Joi.string().required(),
  });
  return schema.validate(user);
};

export default User;
