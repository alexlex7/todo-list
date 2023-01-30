export interface Todo {
  _id: string;
  text: string;
  isDone: boolean;
  created: string;
  expiringDate: string;
}

export interface TodoLists {
  _id: string;
  listName: string;
  expiringDate: string;
  todos: Todo[];
  owner: string;
  public: boolean;
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
