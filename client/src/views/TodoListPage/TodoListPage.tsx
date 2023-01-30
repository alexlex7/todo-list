import { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import ListView from '../../components/ListView/ListView';
import CardView from '../../components/CardView/CardView';
import TodoPagination from '../../components/TodoPagination/TodoPagination';
import { TodoLists } from '../../interfaces';
import { useSettings } from '../../context/settingsContext';

export default function TodoListPage() {
  const [todoLists, setTodoLists] = useState<TodoLists[] | []>([]);
  const settings = useSettings();

  const handleSetTodos = useCallback(
    (todos: TodoLists[]) => {
      setTodoLists(todos);
    },
    [setTodoLists],
  );

  const handleRemoveTodo = (id: string) => {
    const todos = todoLists.filter((item) => {
      console.log(item._id);
      return item._id !== id;
    });
    setTodoLists(todos);
  };

  return (
    <>
      {settings && (
        <Container disableGutters>
          {settings.view === 'list' && (
            <ListView todoLists={todoLists} removeTodo={handleRemoveTodo} />
          )}
          {settings.view === 'card' && (
            <CardView todoLists={todoLists} removeTodo={handleRemoveTodo} />
          )}
          <TodoPagination setTodos={handleSetTodos} limit={settings.itemsOnPage} />
        </Container>
      )}
    </>
  );
}
