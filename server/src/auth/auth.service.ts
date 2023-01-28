import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/login-user.dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user);
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

  async login(user: CreateUserDto) {
    const { email } = user;
    return {
      access_token: this.jwtService.sign({ email }),
      email,
    };
  }
}
