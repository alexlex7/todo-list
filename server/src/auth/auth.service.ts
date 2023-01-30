import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/interfaces';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { _id, email } = user;
        return { _id: _id.toHexString(), email };
      }
      throw new BadRequestException('Wrong password');
    }
    return null;
  }

  async login(user: IUser) {
    const { email, _id } = user;
    const token = this.jwtService.sign({ email, sub: _id });
    return {
      access_token: token,
      email,
    };
  }
}
