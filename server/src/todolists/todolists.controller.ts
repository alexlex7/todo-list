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
  ApiTags,
  ApiOkResponse,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { UserRequest } from 'src/interfaces/interfaces';
import { CreateTodolistDto } from './dto/create-todolist.dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto/update-todolist.dto';
import { TodoList } from './entities/todolist.entity';
import { TodolistsService } from './todolists.service';

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
    @Req() request: UserRequest,
  ) {
    const { _id } = request.user;
    return this.todoListsService.findAll(paginationQuery, _id);
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
    @Req() request: UserRequest,
  ) {
    const { _id } = request.user;
    return this.todoListsService.create(createTodoListDto, _id);
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
