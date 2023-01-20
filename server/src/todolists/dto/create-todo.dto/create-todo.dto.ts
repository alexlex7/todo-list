import { IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;

  @IsBoolean()
  isDone: boolean;

  @IsString()
  created: string;

  @IsString()
  expiringDate: string;
}
