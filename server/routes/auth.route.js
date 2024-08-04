// ------ Imports ------ //
// Modules
import express from "express";
// Controllers
import { signup, login } from "../controllers/index.js";

// ------ Router Setup ------ //
const router = express.Router();

// ------ Routes ------ //

//Signup
router.post("/signup", signup);

//Login
router.post("/login", login);

// ------ Export ------ //
export default router;
