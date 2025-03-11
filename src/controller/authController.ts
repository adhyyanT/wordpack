import { Request, Response } from "express";
import {
  AppUser,
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
      authService.generateToken(savedUser, res);
      res.status(200).json(savedUser);
    } catch (error) {
      console.log("here");
      res.status(500).json(error);
    }
  }
}
export default AuthController.getInstance();
