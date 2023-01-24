import { useState, useMemo } from 'react';
import { DateTime } from 'luxon';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import TodoListItem from '../TodoListItem/TodoListItem';
import TodoListSubheader from '../TodoListSubheader/TodoListSubheader';
import { Todo } from '../../interfaces';

interface Props {
  listName: string;
  items: Todo[];
  id: number;
  expiringDate: string;
}

export default function TodoList({ listName, items, id, expiringDate }: Props) {
  const [open, setOpen] = useState(true);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1;
      }),
    [items],
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const date = DateTime.fromISO(expiringDate);
  const currentDate = DateTime.now();
  const isExpired = currentDate > date;
  const daysToExpire = date.diff(currentDate, 'days').toObject().days;
  const isExpirationDateComingUp = daysToExpire ? daysToExpire < 3 && !isExpired : false;

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
          listId={id}
          expiringDate={date.toFormat('MMM dd')}
          isExpired={isExpired}
          isExpirationDateComingUp={isExpirationDateComingUp}
          daysToExpire={daysToExpire ? Math.ceil(daysToExpire) : undefined}
        />
      }
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        {sortedItems.map((item) => (
          <TodoListItem key={item._id} item={item} listName={listName} />
        ))}
      </Collapse>
    </List>
  );
}
