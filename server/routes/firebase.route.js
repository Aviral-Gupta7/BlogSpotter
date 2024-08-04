// ------ Importing the required modules ------ //
import express from "express";
import { initializeApp } from "firebase/app";
import multer from "multer";
import { firebaseConfig } from "../src/firebase.config.js";
import { uploadImage } from "../controllers/index.js";

const router = express.Router();

// Initialize Firebase Application
initializeApp(firebaseConfig);
//Set Multer Storage Engine
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("filename"), uploadImage);

export default router;
