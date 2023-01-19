import { TodoLists } from '../interfaces';
import { todoLists } from '../data/todos';

interface Args {
  from: number;
  to: number;
}

interface Response {
  count: number;
  data: TodoLists[];
}

interface Service {
  getData: ({ from, to }: Args) => Promise<Response>;
  getTodoListById: (id: number) => Promise<{ data: TodoLists }>;
}

const service: Service = {
  getData: ({ from, to }: Args) => {
    return new Promise((resolve) => {
      const data = todoLists.slice(from, to);
      resolve({
        count: todoLists.length,
        data: data,
      });
    });
  },

  getTodoListById: (id) => {
    return new Promise((resolve, reject) => {
      const data = todoLists.find((item) => item.id === id);
      if (data) {
        resolve({
          data,
        });
      } else {
        reject({ data: `Todo list with id: ${id} not found.` });
      }
    });
  },
};

export default service;
