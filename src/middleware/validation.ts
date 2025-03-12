import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import {
  TAppUserLoginRequest,
  TAppUserLoginValidationSchema,
  TAppUserRegisterRequest,
  TAppUserRegisterValidationSchema,
} from "../model/AppUser";

export const AppUserValidation =
  <T extends TAppUserLoginRequest | TAppUserRegisterRequest>(
    schema:
      | typeof TAppUserLoginValidationSchema
      | typeof TAppUserRegisterValidationSchema
  ) =>
  (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ errors: (error as z.ZodError).issues });
    }
  };
