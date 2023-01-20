import TodoList from '../TodoList/TodoList';
import { Box, List, ListItem } from '@mui/material';
import { TodoLists } from '../../interfaces';

interface Props {
  todoLists: TodoLists[];
}

export default function ListView({ todoLists }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          justifyContent: 'center',
          maxWidth: '630px',
        }}
      >
        {todoLists.map(({ _id, listName, todos }) => (
          <ListItem key={_id}>
            <TodoList listName={listName} items={todos} id={_id} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
