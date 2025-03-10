import { Request, Response } from "express";
import { AppUser, TAppUserRequest, TAppUserResponse } from "../model/AppUser";

class AuthController {
  private static authController?: AuthController;

  private constructor() {}

  static getInstance() {
    if (!this.authController)
      return (this.authController = new AuthController());
    return this.authController;
  }

  async login(
    req: Request<unknown, TAppUserResponse, TAppUserRequest>,
    res: Response
  ) {
    /***
     * Add authentication using jwt and add service layer
     */
    try {
      const body = req.body;
      console.log(body);
      const appUser = new AppUser(body);
      const savedUser = await appUser.save();
      console.log(savedUser);
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default AuthController.getInstance();
