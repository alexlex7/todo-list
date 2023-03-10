import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateTodolistDto } from './dto/create-todolist.dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto/update-todolist.dto';
import { TodoList } from './entities/todolist.entity';

@Injectable()
export class TodolistsService {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoList>,
  ) {}
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const todoLists = await this.todoListModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    const totalCount = await this.todoListModel.countDocuments();
    return { todoLists, totalCount };
  }

  async findOne(id: string) {
    const todoList = await this.todoListModel.findOne({ _id: id }).exec();
    if (!todoList) {
      throw new NotFoundException(`Todolist #${id} not found`);
    }
    return todoList;
  }

  async create(createTodoListDto: CreateTodolistDto) {
    const todoList = new this.todoListModel(createTodoListDto);
    return await todoList.save();
  }

  async update(id: string, updateTodoListDto: UpdateTodolistDto) {
    const existingTodoList = this.todoListModel
      .findOneAndUpdate({ _id: id }, { $set: updateTodoListDto }, { new: true })
      .exec();

    if (!existingTodoList) {
      throw new NotFoundException(`Todo list with id - ${id} not found`);
    }

    return existingTodoList;
  }

  async remove(id: string) {
    const todoList = await this.todoListModel.findOne({ _id: id });
    return todoList?.remove();
  }
}
