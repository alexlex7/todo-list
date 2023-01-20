export interface Todo {
  _id: string;
  id: number;
  text: string;
  isDone: boolean;
  created: string;
  expiringDate: string;
}

export interface TodoLists {
  _id: number;
  listName: string;
  todos: Todo[];
}

export type ViewType = 'card' | 'list';
