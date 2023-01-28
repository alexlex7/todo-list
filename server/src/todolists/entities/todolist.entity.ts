import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DateTime } from 'luxon';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Todo extends Document {
  @Prop()
  @ApiProperty({ type: String, description: 'Text content of the task' })
  text: string;

  @Prop({ default: false })
  @ApiProperty({ type: Boolean, default: false })
  isDone: boolean;

  @Prop({ default: DateTime.now().toISO() })
  @ApiProperty({ type: String })
  created: string;

  @Prop({ default: DateTime.now().toISO() })
  @ApiProperty({
    type: String,
    description: 'Date when todo list should be done',
  })
  expiringDate: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

@Schema()
export class TodoList extends Document {
  @Prop()
  @ApiProperty({ type: String, description: 'Name of todo list' })
  listName: string;

  @Prop()
  @ApiProperty({ type: String })
  expiringDate: string;

  @Prop({ type: [TodoSchema], default: [] })
  @ApiProperty({ isArray: true, type: Todo })
  todos: Todo[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @ApiProperty({ type: String })
  owner: User;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
