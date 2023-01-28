import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTodoDto } from '../create-todo.dto/create-todo.dto';

export class CreateTodolistDto {
  @IsString()
  @ApiProperty()
  readonly listName: string;

  @IsString()
  @ApiProperty()
  readonly expiringDate: string;

  @ValidateNested()
  @Type(() => CreateTodoDto)
  @ApiProperty({ isArray: true, type: CreateTodoDto })
  readonly todos: CreateTodoDto[];
}
