export interface Todo {
  _id: string;
  text: string;
  isDone: boolean;
  created: string;
  expiringDate: string;
}

export interface TodoLists {
  _id: number;
  listName: string;
  expiringDate: string;
  todos: Todo[];
}

export interface CreateTodo {
  text: string;
  isDone?: boolean;
  created?: string;
  expiringDate?: string;
}
export interface CreateTodoLists {
  listName: string;
  todos: CreateTodo[];
}

export type ViewType = 'card' | 'list';
