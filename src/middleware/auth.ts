import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TAppUserResponse } from "../model/AppUser";

declare global {
  namespace Express {
    interface Request {
      user: TAppUserResponse;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      res.sendStatus(401);
      return;
    }
    const secret = process.env.SECRET;
    if (!secret) throw new Error("secret not defined");
    const decoded = jwt.verify(token, secret) as TAppUserResponse;
    req.user = decoded;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
