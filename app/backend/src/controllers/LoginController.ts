import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const token = await this.loginService.login(req.body);

    return res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Unauthorized' });

    const role = await this.loginService.validate(authorization);

    return res.status(200).json(role);
  };
}

export default LoginController;
