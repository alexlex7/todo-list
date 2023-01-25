import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DateTime } from 'luxon';

@Schema()
export class Todo extends Document {
  @Prop()
  text: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ default: DateTime.now().toISO() })
  created: string;

  @Prop({ default: DateTime.now().toISO() })
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
