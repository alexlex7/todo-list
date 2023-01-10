import { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import TodoListItem from '../TodoListItem/TodoListItem';
import TodoListSubheader from '../TodoListSubheader/TodoListSubheader';

export default function TodoList({ listName, items }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ flex: '1 1 auto' }}
      component="ul"
      aria-labelledby="nested-list-subheader"
      dense
      subheader={
        <TodoListSubheader
          handelExpand={handleClick}
          isOpen={open}
          listName={listName}
          quantityOfTodo={items.length}
        />
      }
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map(item => (
          <TodoListItem key={item.id} item={item} listName={listName} />
        ))}
      </Collapse>
    </List>
  );
}

TodoList.propTypes = {
  listName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool,
      created: PropTypes.string.isRequired,
      expiringDate: PropTypes.string,
    }).isRequired
  ).isRequired,
};
