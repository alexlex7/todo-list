export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
  created: string;
  expiringDate: string;
}

export interface TodoLists {
  id: number;
  listName: string;
  items: Todo[];
}
