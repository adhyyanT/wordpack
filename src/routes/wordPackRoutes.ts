import express from "express";
import wordPackController from "../controller/wordPackController";
import { requestBodyValidation } from "../middleware/validation";
import { TWordPackValidation } from "../model/WordPack";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();
router.post(
  "/create",
  requestBodyValidation(TWordPackValidation),
  authenticateUser,
  wordPackController.createWordPack
);
router.get("/:wordPackId", wordPackController.getWordPack);
export default router;
