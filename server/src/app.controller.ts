import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/skipAuth';
import { UsersService } from './users/users.service';

interface User {
  email: string;
  password: string;
}
interface Req {
  user: User;
}
@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Request() req: any) {
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
