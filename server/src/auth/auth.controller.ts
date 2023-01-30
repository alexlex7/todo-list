import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserRequest } from 'src/interfaces/interfaces';
import { CreateUserDto } from 'src/users/dto/login-user.dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './skipAuth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @ApiResponse({ status: 201, description: 'Success logged in.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Req() req: UserRequest) {
    return this.authService.login({
      _id: req.user._id,
      email: createUserDto.email,
    });
  }

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
