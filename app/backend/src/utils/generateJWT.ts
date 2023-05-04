import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import Jwt from '../interfaces/Jwt';

const generateJWTToken = (user: Jwt) => {
  const jwtConfig: SignOptions = { expiresIn: '24h', algorithm: 'HS256' };

  const secret = process.env.JWT_SECRET || 'jwt_secret';

  return sign({ user }, secret, jwtConfig);
};

export default generateJWTToken;
