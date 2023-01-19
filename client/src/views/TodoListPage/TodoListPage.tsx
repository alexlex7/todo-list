import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher';
import ListView from '../../components/ListView/ListView';
import CardView from '../../components/CardView/CardView';
import TodoPagination from '../../components/TodoPagination/TodoPagination';
import { TodoLists, ViewType } from '../../interfaces';

export default function TodoListPage() {
  const [view, setView] = useState<ViewType>('list');
  const [itemsOnPage, setItemsOnPage] = useState(3);
  const [todoLists, setTodoLists] = useState<TodoLists[] | []>([]);

  function handleChange(event: React.MouseEvent<HTMLElement>, nextView: ViewType) {
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
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: 'grey.200',
          pl: 2,
          pr: 2,
        }}
      >
        <Container
          maxWidth={'lg'}
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Button component={RouterLink} to="create" variant="contained">
            Create todo
          </Button>
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
      </Container>
    </>
  );
}
