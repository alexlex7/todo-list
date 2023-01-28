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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiCreatedResponse,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';
import { type } from 'os';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateTodolistDto } from './dto/create-todolist.dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto/update-todolist.dto';
import { TodoList } from './entities/todolist.entity';
import { TodolistsService } from './todolists.service';

interface IRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@ApiBearerAuth()
@ApiTags('todolists')
@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todoListsService: TodolistsService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description:
      'Returns array of todo lists, quantity depends on passed parameters',
    isArray: true,
    type: TodoList,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Req() request: IRequest,
  ) {
    const { userId } = request.user;
    return this.todoListsService.findAll(paginationQuery, userId);
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'The found todo list',
    type: TodoList,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({ status: 401, description: 'Error: Unauthorized' })
  @ApiParam({ name: 'id', type: String, example: '63cd8faffbe17030eef78b7e' })
  findOne(@Param('id') id: string) {
    return this.todoListsService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: TodoList,
    description: 'Created todo list',
  })
  @ApiResponse({ status: 401, description: 'Error: Unauthorized' })
  create(
    @Body() createTodoListDto: CreateTodolistDto,
    @Req() request: IRequest,
  ) {
    const { userId } = request.user;
    return this.todoListsService.create(createTodoListDto, userId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, example: '63cd8faffbe17030eef78b7e' })
  @ApiResponse({
    status: 201,
    description: 'Successfully updated',
    type: TodoList,
  })
  @ApiResponse({ status: 401, description: 'Error: Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodolistDto,
  ) {
    return this.todoListsService.update(id, updateTodoListDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, example: '63cd8faffbe17030eef78b7e' })
  @ApiResponse({
    status: 200,
    type: TodoList,
    description: 'Successfully removed',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 401, description: 'Error: Unauthorized' })
  remove(@Param('id') id: string) {
    return this.todoListsService.remove(id);
  }
}
