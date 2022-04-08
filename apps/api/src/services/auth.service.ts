import { LoginDto } from '@nx-test/shared-dto';
import { User } from '@nx-test/shared-models';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '@nx-test/shared-dto';
import userService from './user.service';

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

class AuthService {
  public async authenticate(loginDto: LoginDto) {
    let candidate: User | null;
    try {
      candidate = await User.findOne({
        where: {
          email: loginDto.email,
        },
      });
    } catch (error) {
      return error;
    }
    if (!candidate) {
      return { status: 404, message: 'User not found' };
    }
    try {
      if (await bcrypt.compare(loginDto.password, candidate.password)) {
        return candidate;
      } else {
        return { status: 403, message: 'Forbidden' };
      }
    } catch (error) {
      return error;
    }
  }

  public async signIn(loginDto: LoginDto) {
    try {
      const authObj = await this.authenticate(loginDto);
      const accessToken = jwt.sign(authObj, process.env.ACCESS_TOKEN_SECRET!);
      return accessToken;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async signUp(createUserDto: CreateUserDto) {
    let candidate;
    try {
      candidate = await userService.createUser(createUserDto);
    } catch (err) {
      return err.message;
    }
    try {
      const accessToken = await this.signIn({
        email: candidate.email,
        password: candidate.password,
      });
      return { accessToken, user: candidate };
    } catch (error) {
      return error.message;
    }
  }
}

export function authenticateToken(req: any, res: any, next: () => void) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) res.send({ status: 401, message: 'Unauthorized' });
  jwt.verify(
    token!,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, user: any) => {
      if (err) {
        res.send({ status: 403, message: 'Token is not valid' });
      }
      console.log(user);
      req.user = user;
      next();
    }
  );
}

const authService = new AuthService();

export default authService;
