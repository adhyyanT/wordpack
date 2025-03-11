import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  AppUser,
  TAppUserRegisterRequest,
  TAppUserResponse,
} from "../model/AppUser";
import jwt from "jsonwebtoken";

class AuthService {
  private static _authService: AuthService;
  private _salt: number;
  private _secret: string;
  private constructor() {
    this._salt = parseInt(process.env.SALT ?? "5");
    const secret = process.env.SECRET;
    if (!secret) throw new Error("secret not defined");
    this._secret = secret;
  }

  static getInstance() {
    if (!this._authService) {
      this._authService = new AuthService();
    }
    return this._authService;
  }

  async register(user: TAppUserRegisterRequest): Promise<TAppUserResponse> {
    user.password = await bcrypt.hash(user.password, this._salt);
    const newUser = new AppUser(user);
    const savedUser = await newUser.save();
    const responseUser = {
      id: savedUser._id,
      createdAt: savedUser.createdAt,
      email: savedUser.email,
      name: savedUser.name,
      updatedAt: savedUser.updatedAt,
    };
    return responseUser;
  }
  generateToken(user: TAppUserResponse, res: Response, setHeader = true) {
    const token = jwt.sign(user, this._secret, {
      expiresIn: "1h",
    });
    if (setHeader) {
      res.set("Authorization", token);
    }
    return token;
  }
}

export default AuthService.getInstance();
