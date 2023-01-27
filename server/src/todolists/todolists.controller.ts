import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateTodolistDto } from './dto/create-todolist.dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto/update-todolist.dto';
import { TodolistsService } from './todolists.service';

interface IRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todoListsService: TodolistsService) {}

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Req() request: IRequest,
  ) {
    const { userId } = request.user;
    return this.todoListsService.findAll(paginationQuery, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListsService.findOne(id);
  }

  @Post()
  create(
    @Body() createTodoListDto: CreateTodolistDto,
    @Req() request: IRequest,
  ) {
    const { userId } = request.user;
    return this.todoListsService.create(createTodoListDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodolistDto,
  ) {
    return this.todoListsService.update(id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListsService.remove(id);
  }
}
