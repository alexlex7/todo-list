import { Module } from '@nestjs/common';
import { TodolistsController } from './todolists.controller';
import { TodolistsService } from './todolists.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Todo,
  TodoList,
  TodoListSchema,
  TodoSchema,
} from './entities/todolist.entity';

@Module({
  controllers: [TodolistsController],
  providers: [TodolistsService],
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
  ],
})
export class TodolistsModule {}
