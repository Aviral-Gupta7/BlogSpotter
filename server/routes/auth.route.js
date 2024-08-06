// ------ Imports ------ //
// Modules
import express from "express";
// Controllers
import { signup, login, verifyToken } from "../controllers/index.js";

// ------ Router Setup ------ //
const router = express.Router();

// ------ Routes ------ //

//Signup
router.post("/signup", signup);

router.get("/verify-token/:id/:token", verifyToken);

//Login
router.post("/login", login);

// ------ Export ------ //
export default router;
