import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistsController } from './todolists/todolists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TodoList,
  TodoListSchema,
  Todo,
  TodoSchema,
} from './todolists/entities/todolist.entity';
import { TodolistsService } from './todolists/todolists.service';
import { SettingsController } from './settings/settings.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todolists'),
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
  ],
  controllers: [AppController, TodolistsController, SettingsController],
  providers: [AppService, TodolistsService],
})
export class AppModule {}
