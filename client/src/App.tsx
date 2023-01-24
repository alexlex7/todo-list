import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTodoListPage from './views/CreateTodoListPage/CreateTodoListPage';
import MainPage from './views/MainPage/MainPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import ShowTodo from './views/ShowTodo/ShowTodo';
import TodoListPage from './views/TodoListPage/TodoListPage';

interface IData {
  threadName: string;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'todolist',
        element: <TodoListPage />,
        handle: {
          crumb: (data: IData) => <span>{data.threadName}</span>,
        },
      },
      {
        path: 'todolist/:id',
        element: <ShowTodo />,
      },
      {
        path: 'todolist/create',
        element: <CreateTodoListPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
