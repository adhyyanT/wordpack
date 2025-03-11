import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { TAppUserValidationSchema } from "../model/AppUser";

export const AppUserValidation =
  (schema: typeof TAppUserValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ errors: (error as z.ZodError).issues });
    }
  };
