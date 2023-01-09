import React from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList';
import { Box, List, ListItem } from '@mui/material';

export default function ListView({ todoLists }) {
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
        {todoLists.map(({ id, listName, items }) => (
          <ListItem key={id}>
            <TodoList listName={listName} items={items} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

ListView.propTypes = {
  todoLists: PropTypes.array.isRequired,
};
