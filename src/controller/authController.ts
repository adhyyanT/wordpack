import { Request, Response } from "express";
import { TAppUserRequest, TAppUserResponse } from "../model/AppUser";

class AuthController {
  private static authController?: AuthController;

  private constructor() {}

  static getInstance() {
    if (!this.authController)
      return (this.authController = new AuthController());
    return this.authController;
  }

  login(
    req: Request<unknown, TAppUserResponse, TAppUserRequest>,
    res: Response
  ) {
    /***
     * Add authentication using jwt and add service layer
     */
    const body = req.body;
    console.log(body);
    res.status(200).json(body);
  }
}
export default AuthController.getInstance();
