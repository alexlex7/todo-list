import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from './entities/todolist.entity';

@Injectable()
export class TodolistsService {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoList>,
  ) {}
  async findAll() {
    const todoLists = await this.todoListModel.find().exec();
    return todoLists;
  }

  async findOne(id: string) {
    const todoList = await this.todoListModel.findOne({ _id: id }).exec();
    if (!todoList) {
      throw new NotFoundException(`Todolist #${id} not found`);
    }
    return todoList;
  }
}
