import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service'; // Adjust path if needed
import { UserSchema, UserDocument } from '../users/users.schema'; // Adjust path if needed
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '8h' }),
    };
  }

  async signup(signupDto: SignupDto): Promise<any> {
    const { username, password, email } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the UsersService to create a new user in the database
    return this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  async signin(signinDto: SigninDto): Promise<any> {
    const { username, password } = signinDto;
    const user = await this.userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '8h' }),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
