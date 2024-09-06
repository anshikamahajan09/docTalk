import express from "express";
import { signUpDoctor, signUpUser, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up/doctor", signUpDoctor);
router.post("/sign-up/user", signUpUser);
router.post("/sign-in", signIn);

export default router;