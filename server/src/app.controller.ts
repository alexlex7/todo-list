import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/skipAuth';
import { CreateUserDto } from './users/dto/login-user.dto/create-user.dto';
import { UsersService } from './users/users.service';

interface User {
  email: string;
  password: string;
}
interface Req {
  user: User;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/signup')
  async signup(@Request() req: any) {
    console.log(req.body);
    return this.usersService.create({
      email: req.body.email,
      password: req.body.password,
    });
  }

  @Get('profile')
  getProfile(@Request() req: Req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
