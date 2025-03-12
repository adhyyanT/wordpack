import { Router } from "express";
import authController from "../controller/authController";
import { AppUserValidation } from "../middleware/validation";
import {
  TAppUserLoginValidationSchema,
  TAppUserRegisterValidationSchema,
} from "../model/AppUser";

const router = Router();

router.post(
  "/register",
  AppUserValidation(TAppUserRegisterValidationSchema),
  authController.register
);
router.post(
  "/login",
  AppUserValidation(TAppUserLoginValidationSchema),
  authController.login
);
export default router;
