// ------ Token to verify email address ------ //
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
