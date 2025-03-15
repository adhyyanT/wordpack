import * as express from "express";
import { TAppUserResponse } from "../model/AppUser";

declare global {
  namespace Express {
    interface Request {
      user: TAppUserResponse; // Or define a more specific type based on your needs
    }
  }
}
