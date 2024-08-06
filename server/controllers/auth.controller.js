// ------ Imports ------ //
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/error.js";
import { sendEmail } from "../utils/index.js";
import crypto from "crypto";
import { User, validateUserSchema, Token } from "../models/index.js";
import { uploadImage } from "./index.js";

//------ Controller functions ------ //

//Signup function
export const signup = async (req, res, next) => {
  try {
    // validate User
    const { error } = validateUserSchema(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //Check if user already Exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send("User already registered");
    }
    //Extracting the fields from the request
    const { username, email, password, gender } = req.body;

    // Validate gender
    if (
      gender != "male" ||
      gender != "female" ||
      gender != "other" ||
      gender != "prefer not to say"
    ) {
      return next(createError(400, "gender not defined"));
    }

    //Hash the password
    const hashedPassword = await bcryptjs.hashSync(password, 12);
    //Generate the profile picture
    if (gender == "prefer not to say" || gender == "other") {
      const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;
    } else {
      const profilePic = `https://avatar.iran.liara.run/public/${
        gender == "male" ? "boy" : "girl"
      }?username=${username}`;
    }
    //Create The User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: profilePic || "https://i.sstatic.net/l60Hf.png",
      gender,
      emailVerification: false,
      type: "user",
    });

    await newUser.save();

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();
    const message = `${process.env.NODEMAILER_BASE_URL}/auth/verify-token/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", message);
    res.send("An Email Send to account pls verify");
  } catch (error) {
    return next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    // Get user and token
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(createError(400, "Invalid Link"));

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return next(createError(400, "Invalid Link"));

    await User.updateOne({
      _id: user._id,
      emailVerification: true,
    });

    await Token.findByIdAndDelete(token._id);
    res.send("Email verified successfully");

    // TODO:  Make user automatically login as well
  } catch (err) {
    return next(err);
  }
};

//Login function
export const login = async (req, res, next) => {};
