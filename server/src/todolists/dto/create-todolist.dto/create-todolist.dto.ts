import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTodoDto } from '../create-todo.dto/create-todo.dto';

export class CreateTodolistDto {
  @IsString()
  readonly listName: string;

  @IsString()
  readonly expiringDate: string;

  @ValidateNested()
  @Type(() => CreateTodoDto)
  readonly todos: CreateTodoDto[];
}
