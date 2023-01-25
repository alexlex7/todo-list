import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTodoListPage from './views/CreateTodoListPage/CreateTodoListPage';
import LoginPage from './views/LoginPage/LoginPage';
import MainPage from './views/MainPage/MainPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
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
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
