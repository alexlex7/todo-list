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
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TodoLists } from '../../interfaces';

interface Props {
  todoLists: TodoLists[];
}

export default function CardView({ todoLists }: Props) {
  const navigate = useNavigate();
  function handleRedirect(listId: number) {
    navigate(`${listId}`);
  }

  return (
    <Grid container spacing={4} p={4}>
      {todoLists.map(({ todos, _id, listName }) => {
        const sortedItems = [...todos].sort((a, b) => {
          return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1;
        });

        return (
          <Grid item xs={12} sm={6} md={4} key={_id}>
            <Card variant="outlined" sx={{ height: '330px' }}>
              <CardActionArea onClick={() => handleRedirect(_id)}>
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
                      <Box display={'flex'} alignItems="center" columnGap="8px">
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
                    </Box>
                  }
                />
                <CardContent sx={{ height: '268px', overflowY: 'scroll' }}>
                  <List>
                    {sortedItems.map(({ _id, text, isDone, expiringDate }) => {
                      const date = DateTime.fromISO(expiringDate).toFormat('MMM dd');
                      return (
                        <ListItem
                          key={_id}
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
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
