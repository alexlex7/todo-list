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
  IconButton,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoLists } from '../../interfaces';
import { removeTodoList } from '../../services/todoApi';

interface Props {
  todoLists: TodoLists[];
  removeTodo: (id: string) => void;
}

export default function CardView({ todoLists, removeTodo }: Props) {
  const navigate = useNavigate();
  function handleRedirect(listId: string) {
    navigate(`${listId}`);
  }

  async function handleRemoveTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    e.stopPropagation();
    const response = await removeTodoList(id);
    if (response?.status === 200) {
      removeTodo(id);
    }
  }

  return (
    <Grid container spacing={4} p={4}>
      {todoLists.map(({ todos, _id, listName, expiringDate }) => {
        const date = DateTime.fromISO(expiringDate);
        const currentDate = DateTime.now();
        const isExpired = currentDate > date;
        const daysToExpire = date.diff(currentDate, 'days').toObject();
        const isExpirationDateComingUp = daysToExpire?.days
          ? daysToExpire?.days < 3 && !isExpired
          : false;

        const sortedItems = [...todos].sort((a, b) => {
          return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1;
        });

        return (
          <Grid item xs={12} sm={6} md={4} key={_id}>
            <Card variant="outlined" sx={{ height: '330px' }}>
              <Box onClick={() => handleRedirect(_id)}>
                <CardHeader
                  sx={[
                    {
                      bgcolor: 'grey.200',
                      pl: '8px',
                      pr: '8px',
                    },
                    (theme) => {
                      return isExpired
                        ? {
                            bgcolor: `${theme.palette.error.light}`,
                          }
                        : {};
                    },
                    (theme) => {
                      return isExpirationDateComingUp
                        ? {
                            bgcolor: `${theme.palette.warning.light}`,
                          }
                        : {};
                    },
                  ]}
                  title={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '38px',
                      }}
                    >
                      <Typography
                        sx={{
                          bgcolor: 'secondary.light',
                          borderRadius: '11px',
                          padding: '3px 5px',
                          textDecoration: isExpired ? 'line-through' : 'none',
                        }}
                      >
                        {listName}
                      </Typography>
                      <Box display={'flex'} alignItems="center" columnGap="8px">
                        <Box>
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
                            {date.toFormat('MMM dd')}th
                          </Box>
                          {isExpirationDateComingUp && daysToExpire?.days && (
                            <Typography variant="body2">
                              expires in {Math.ceil(daysToExpire.days)} days
                            </Typography>
                          )}
                        </Box>
                        <Typography
                          sx={{
                            bgcolor: 'common.white',
                            padding: '2px 8px',
                            borderRadius: '0.375rem',
                          }}
                        >
                          {sortedItems.length}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            component={RouterLink}
                            to={`${_id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={(e) => handleRemoveTodo(e, _id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
                <CardContent sx={{ height: '268px', overflowY: 'scroll' }}>
                  <List>
                    {sortedItems.map(({ _id, text, isDone }) => {
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
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
