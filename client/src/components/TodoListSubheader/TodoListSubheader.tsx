import { ListSubheader, Box, Typography, Link, Button, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { removeTodoList } from '../../services/todoApi';

interface Props {
  handelExpand(): void;
  isOpen: boolean;
  listName: string;
  quantityOfTodo: number;
  listId: string;
  expiringDate: string;
  isExpired: boolean;
  isExpirationDateComingUp: boolean;
  daysToExpire: number | undefined;
  removeTodo: (id: string) => void;
}

export default function TodoListSubheader({
  handelExpand,
  isOpen,
  listName,
  quantityOfTodo,
  listId,
  expiringDate,
  isExpirationDateComingUp,
  isExpired,
  daysToExpire,
  removeTodo,
}: Props) {
  const { id } = useParams();

  const handleRemoveTodo = async (id: string) => {
    const response = await removeTodoList(id);
    if (response?.status === 200) {
      removeTodo(id);
    }
  };
  return (
    <ListSubheader
      onClick={handelExpand}
      component="div"
      id="nested-list-subheader"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          columnGap: 2,
          flex: '1 1 auto',
          bgcolor: 'grey.200',
          borderTopRightRadius: '6px',
          borderTopLeftRadius: '6px',
          typography: 'body2',
          pt: '10px',
          pb: '10px',
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
    >
      <ExpandMoreIcon
        sx={[
          {
            transition: 'all 0.3s ease-in-out',
          },
          () => (!isOpen ? { transform: 'rotate(-90deg)' } : null),
        ]}
      />
      <Box sx={{ display: 'flex', flex: '1 1 auto' }}>
        <Box
          component="span"
          sx={{
            bgcolor: 'secondary.light',
            borderRadius: '11px',
            padding: '3px 7px',
            textDecoration: isExpired ? 'line-through' : 'none',
          }}
        >
          {listName}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" columnGap={1}>
        <Box display={'flex'} alignItems="center" columnGap={1}>
          {isExpirationDateComingUp && daysToExpire && (
            <Typography variant="body2">expires in {daysToExpire} days</Typography>
          )}
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              typography: 'body2',
            }}
          >
            <CalendarMonthIcon fontSize="small" />
            {expiringDate}th
          </Box>
        </Box>
        {!id && (
          <>
            <Link
              p="6px 8px"
              component={RouterLink}
              to={`${listId}`}
              sx={{ textDecoration: 'none', color: 'grey.900' }}
            >
              Open list
            </Link>
          </>
        )}
        <Typography
          sx={{
            bgcolor: 'common.white',
            padding: '2px 8px',
            borderRadius: '0.375rem',
          }}
        >
          {quantityOfTodo}
        </Typography>
        <IconButton component={RouterLink} to={`${listId}/edit`}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={(e) => handleRemoveTodo(listId)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListSubheader>
  );
}
