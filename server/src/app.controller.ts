import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/skipAuth';
import { UsersService } from './users/users.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/login-user.dto/create-user.dto';
import { LoginResponse } from './interfaces/interfaces';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @ApiTags('auth')
  @ApiResponse({ status: 201, description: 'Success logged in.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  @ApiTags('auth')
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiCreatedResponse({ description: 'New user created' })
  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }
}
