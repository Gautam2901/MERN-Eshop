import express from "express";
import { signUp, signIn } from "../controller/user.controller.js";
import { body } from "express-validator";
import multer from "multer";

const upload = multer({dest: "public/images"});
const router = express.Router();


router.post("/signup", upload.single("profile"), body("email", "Invalid Email").isEmail(),
body("email", "Email cannot be empty").notEmpty(),
body("password", "Password is required").notEmpty(),
body("contact", "Contact is required").notEmpty(),
body("contact", "Should be digits").isNumeric(), signUp);

router.post("/signin", signIn);
export default router;