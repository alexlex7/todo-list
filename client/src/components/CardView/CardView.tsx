import { DateTime } from 'luxon';
import {
  List,
  ListItem,
  Checkbox,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardHeader,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TodoLists } from '../../interfaces';

interface Props {
  todoLists: TodoLists[];
}

export default function CardView({ todoLists }: Props) {
  return (
    <Grid container spacing={4} p={4}>
      {todoLists.map(({ items, id, listName }) => {
        const sortedItems = [...items].sort((a, b) => {
          return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1;
        });

        return (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card variant="outlined" sx={{ height: '330px' }}>
              <CardHeader
                sx={{ bgcolor: 'grey.200' }}
                title={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '11px',
                        padding: '3px 7px',
                      }}
                    >
                      {listName}
                    </Typography>
                    <Typography
                      sx={{
                        bgcolor: 'common.white',
                        padding: '2px 8px',
                        borderRadius: '0.375rem',
                      }}
                    >
                      {sortedItems.length}
                    </Typography>
                  </Box>
                }
              />
              <CardContent sx={{ height: '268px', overflowY: 'scroll' }}>
                <List>
                  {sortedItems.map(({ id, text, isDone, expiringDate }) => {
                    const date = DateTime.fromFormat(expiringDate, 'dd MMM yyyy, T').toFormat(
                      'MMM dd',
                    );
                    return (
                      <ListItem
                        key={id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          rowGap: 0.5,
                          borderBottom: '1px solid',
                          borderBottomColor: 'grey.200',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox edge="start" checked={isDone} disableRipple />
                          <Typography
                            sx={[
                              { typography: 'subtitle2' },
                              () => {
                                return isDone ? { textDecoration: 'line-through' } : null;
                              },
                            ]}
                          >
                            {text}
                          </Typography>
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ml: 3,
                            typography: 'body2',
                          }}
                        >
                          <CalendarMonthIcon fontSize="small" />
                          {date}th
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
