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
  async findAll(paginationQuery: PaginationQueryDto, userId: string) {
    const totalCount = await this.todoListModel
      .countDocuments({ owner: userId })
      .exec();
    const { limit, offset } = paginationQuery;
    const todoLists = await this.todoListModel
      .find({ owner: userId })
      .skip(offset)
      .limit(limit)
      .exec();
    return { todoLists, totalCount };
  }

  async findOne(id: string) {
    try {
      const todoList = await this.todoListModel.findOne({ _id: id }).exec();
      return todoList;
    } catch (error) {
      throw new NotFoundException(`Todolist #${id} not found`);
    }
  }

  async create(createTodoListDto: CreateTodolistDto, userId: string) {
    const todoList = new this.todoListModel({
      ...createTodoListDto,
      owner: userId,
    });
    return await todoList.save();
  }

  async update(id: string, updateTodoListDto: UpdateTodolistDto) {
    const existingTodoList = await this.todoListModel
      .findOneAndUpdate({ _id: id }, { $set: updateTodoListDto }, { new: true })
      .exec();

    if (!existingTodoList) {
      throw new NotFoundException(`Todo list with id - ${id} not found`);
    }
    console.log(existingTodoList);
    return existingTodoList;
  }

  async remove(id: string) {
    try {
      const todoList = await this.todoListModel.findOne({ _id: id });
      if (!todoList) {
        throw new NotFoundException(`Todo list with id - ${id} not found`);
      }
      return todoList?.remove();
    } catch (error) {
      throw new NotFoundException(`Todo list with id - ${id} not found`);
    }
  }
}
