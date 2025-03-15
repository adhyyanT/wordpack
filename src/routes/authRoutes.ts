import { Router } from "express";
import authController from "../controller/authController";
import { requestBodyValidation } from "../middleware/validation";
import {
  TAppUserLoginValidationSchema,
  TAppUserRegisterValidationSchema,
} from "../model/AppUser";

const router = Router();

router.post(
  "/register",
  requestBodyValidation(TAppUserRegisterValidationSchema),
  authController.register
);
router.post(
  "/login",
  requestBodyValidation(TAppUserLoginValidationSchema),
  authController.login
);
export default router;
