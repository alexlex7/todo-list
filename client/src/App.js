import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTodoListPage from './views/CreateTodoListPage/CreateTodoListPage';
import MainPage from './views/MainPage/MainPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
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
