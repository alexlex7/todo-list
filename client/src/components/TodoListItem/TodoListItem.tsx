import { DateTime } from 'luxon';
import { ListItem, Checkbox, ListItemText, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Todo } from '../../interfaces';

interface Props {
  listName: string;
  item: Todo;
}

export default function TodoListItem({ item, listName }: Props) {
  const { id, isDone, text, expiringDate } = item;
  const date = DateTime.fromFormat(expiringDate, 'dd MMM yyyy, T').toFormat('MMM dd');
  return (
    <ListItem
      key={id}
      disablePadding
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderTop: '0',
        bgcolor: 'common.white',
        pl: 3,
        pr: 3,
        typography: 'body2',
      }}
    >
      <Checkbox edge="start" checked={isDone} disableRipple />
      <Box sx={{ display: 'flex', pr: 1, flexBasis: '100%', alignItems: 'center' }}>
        <ListItemText
          primary={text}
          sx={[
            {
              display: 'inline-flex',
              flex: '1 0',
            },
            () => {
              return isDone ? { textDecoration: 'line-through' } : null;
            },
          ]}
        />
        <Box
          component="span"
          sx={{ bgcolor: 'secondary.light', borderRadius: '11px', padding: '3px 7px' }}
        >
          {listName}
        </Box>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <CalendarMonthIcon fontSize="small" />
          {date}th
        </Box>
      </Box>
    </ListItem>
  );
}
