import { Router } from "express";
import authController from "../controller/authController";

const router = Router();

router.post("/login", authController.register);

export default router;
