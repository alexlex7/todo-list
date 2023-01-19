import { Controller, Get, Param } from '@nestjs/common';
import { TodolistsService } from './todolists.service';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todoListsService: TodolistsService) {}

  @Get()
  findAll() {
    return this.todoListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListsService.findOne(id);
  }
}
