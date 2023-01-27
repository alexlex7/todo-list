import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './PrivatRoute';
import PublicRoute from './PublicRoute';
import CreateTodoListPage from './views/CreateTodoListPage/CreateTodoListPage';
import LoginPage from './views/LoginPage/LoginPage';
import MainPage from './views/MainPage/MainPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import ShowTodo from './views/ShowTodo/ShowTodo';
import TodoListPage from './views/TodoListPage/TodoListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'todolist',
        element: (
          <PrivateRoute redirectPath="/login">
            <TodoListPage />
          </PrivateRoute>
        ),
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
        element: (
          <PublicRoute restricted redirectPath="/todolist">
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: 'registration',
        element: (
          <PublicRoute restricted redirectPath="/todolist">
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
