import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import { ListItem, Checkbox, ListItemButton, ListItemText, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TodoListItem({ item, listName }) {
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
      <ListItemButton disableGutters sx={{ display: 'flex', pr: 1 }}>
        <ListItemText
          primary={text}
          sx={{
            display: 'inline-flex',
            flex: '1 0',
          }}
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
      </ListItemButton>
    </ListItem>
  );
}

TodoListItem.propTypes = {
  listName: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool,
    created: PropTypes.string.isRequired,
    expiringDate: PropTypes.string,
  }).isRequired,
};
