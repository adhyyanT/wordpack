import { Request, Response } from "express";
import {
  AppUser,
  TAppUserLoginRequest,
  TAppUserRegisterRequest,
  TAppUserResponse,
} from "../model/AppUser";
import authService from "../service/authService";

class AuthController {
  private static authController?: AuthController;

  private constructor() {}

  static getInstance() {
    if (!this.authController)
      return (this.authController = new AuthController());
    return this.authController;
  }

  async register(
    req: Request<unknown, unknown, TAppUserRegisterRequest>,
    res: Response<TAppUserResponse | unknown>
  ) {
    /***
     * Add authentication using jwt and add service layer
     */
    try {
      const savedUser = await authService.register(req.body);
      if (!savedUser) {
        res.status(400).json({ error: "user already exists" });
        return;
      }
      authService.generateToken(savedUser, res);
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  async login(
    req: Request<unknown, unknown, TAppUserLoginRequest>,
    res: Response<TAppUserResponse | unknown>
  ) {
    try {
      const savedUser = await authService.login(req.body, res);
      if (!savedUser) {
        res.status(400).json({ error: "user not found" });
        return;
      }
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
export default AuthController.getInstance();
