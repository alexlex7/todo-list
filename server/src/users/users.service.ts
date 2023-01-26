import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/login-user.dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);
    if (user) {
      throw new BadRequestException(
        `User with email - ${createUserDto.email} already exists`,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hash,
    });

    return await newUser.save();
  }
}
