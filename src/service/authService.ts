import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  AppUser,
  TAppUserLoginRequest,
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

  async register(
    user: TAppUserRegisterRequest
  ): Promise<TAppUserResponse | null> {
    const opUser = await AppUser.findOne({ email: user.email });
    if (opUser) {
      return null;
    }
    user.password = await bcrypt.hash(user.password, this._salt);
    const newUser = new AppUser(user);
    const savedUser = await newUser.save();
    const responseUser: TAppUserResponse = {
      id: savedUser._id,
      createdAt: savedUser.createdAt,
      email: savedUser.email,
      name: savedUser.name,
      updatedAt: savedUser.updatedAt,
      wordPacks: savedUser.wordPacks,
    };
    return responseUser;
  }

  async login(
    loginUser: TAppUserLoginRequest,
    res: Response
  ): Promise<TAppUserResponse | null> {
    const user = await AppUser.findOne({ email: loginUser.email });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(loginUser.password, user.password);
    if (!isMatch) {
      return null;
    }
    const resUser: TAppUserResponse = {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      name: user.name,
      updatedAt: user.updatedAt,
      wordPacks: user.wordPacks,
    };
    this.generateToken(resUser, res);
    return resUser;
  }

  generateToken(user: TAppUserResponse, res: Response, setHeader = true) {
    const token = jwt.sign(user, this._secret, {
      expiresIn: "1h",
    });
    if (setHeader) {
      res.set("authorization", token);
    }
    return token;
  }
}

export default AuthService.getInstance();
