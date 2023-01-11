import todoLists from '../data/todos';

const service = {
  getData: ({ from, to }) => {
    return new Promise((resolve) => {
      const data = todoLists.slice(from, to);
      resolve({
        count: todoLists.length,
        data: data,
      });
    });
  },
};

export default service;
