import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Header from '../../components/Header/Header';
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher';
import ListView from '../../components/ListView/ListView';
import CardView from '../../components/CardView/CardView';
import TodoPagination from '../../components/TodoPagination/TodoPagination';
import { TodoLists } from '../../data/todos';

export default function MainPage() {
  const [view, setView] = useState('card');
  const [itemsOnPage, setItemsOnPage] = useState(3);
  const [todoLists, setTodoLists] = useState<TodoLists[] | []>([]);

  function handleChange(event: React.MouseEvent<HTMLElement>, nextView: string) {
    setView(nextView);
  }

  const handleSetTodos = useCallback(
    (todos: TodoLists[]) => {
      setTodoLists(todos);
    },
    [setTodoLists],
  );

  return (
    <>
      <Header />
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: 'grey.200',
          pl: 2,
          pr: 2,
        }}
      >
        <Container maxWidth={'lg'} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ViewSwitcher
            view={view}
            handleChangeView={handleChange}
            setItemsOnPage={(event) => {
              setItemsOnPage(Number(event.target.value));
            }}
            itemsOnPage={String(itemsOnPage)}
          />
        </Container>
      </Box>
      <Container disableGutters>
        {view === 'list' && <ListView todoLists={todoLists} />}
        {view === 'card' && <CardView todoLists={todoLists} />}
        <TodoPagination setTodos={handleSetTodos} pageSize={itemsOnPage} />
        <Outlet />
      </Container>
    </>
  );
}
