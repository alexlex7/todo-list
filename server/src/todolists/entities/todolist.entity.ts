import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop()
  text: string;

  @Prop()
  isDone: boolean;

  @Prop()
  created: string;

  @Prop()
  expiringDate: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

@Schema()
export class TodoList extends Document {
  @Prop()
  listName: string;

  @Prop()
  expiringDate: string;

  @Prop({ type: [TodoSchema], default: [] })
  todos: Todo[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
