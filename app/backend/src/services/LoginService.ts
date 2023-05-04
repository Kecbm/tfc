import * as bcrypt from 'bcryptjs';
import Login from '../interfaces/Login';
import User from '../database/models/User';
import generateJWT from '../utils/generateJWT';
import HttpException from '../utils/HttpException';
import ValidateJWT from '../utils/validateJWT';

class UserService {
  private user: typeof User;
  private validateJwt: ValidateJWT;

  constructor() {
    this.user = User;
    this.validateJwt = new ValidateJWT();
  }

  public async login(user: Login) {
    const { email, password } = user;

    const userLogged = await this.user.findOne({
      where: {
        email,
      },
    });
    if (!userLogged) throw new HttpException(401, 'Incorrect email or password');

    const passwordValid = await bcrypt.compare(password, userLogged.password);
    if (!passwordValid) throw new HttpException(401, 'Incorrect email or password');

    return generateJWT({ id: userLogged.id });
  }

  public async validate(token: string) {
    const userId = this.validateJwt.decode(token);

    const user = await this.user.findOne({
      where: {
        id: userId.id,
      },
    });

    if (!user) throw new HttpException(401, 'User not found');

    return { role: user.role };
  }
}

export default UserService;
