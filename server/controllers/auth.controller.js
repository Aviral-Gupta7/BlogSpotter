// ------ Imports ------ //
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/error.js";

//------ Controller functions ------ //

//Signup function
export const signup = async (req, res, next) => {
  //Extracting the fields from the request
  const { username, email, password } = req.body;
  //Make sure there is some values in the fields
  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(createError(400, "All fields are required"));
  }
  //Hash the password
  const hashedPassword = await bcryptjs.hashSync(password, 12);
  //Create The User
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: "" || "https://i.sstatic.net/l60Hf.png",
  });
};

//Login function
export const login = async (req, res, next) => {};
