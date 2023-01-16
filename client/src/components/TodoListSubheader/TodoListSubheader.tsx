import { ListSubheader, Box, Typography, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink, useParams } from 'react-router-dom';
// import LinkBehavior from '../LinkBehavior/LinkBehavior';

interface Props {
  handelExpand(): void;
  isOpen: boolean;
  listName: string;
  quantityOfTodo: number;
  listId: number;
}

export default function TodoListSubheader({
  handelExpand,
  isOpen,
  listName,
  quantityOfTodo,
  listId,
}: Props) {
  const { id } = useParams();
  return (
    <ListSubheader
      onClick={handelExpand}
      component="div"
      id="nested-list-subheader"
      sx={{
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
      }}
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
          sx={{ bgcolor: 'secondary.light', borderRadius: '11px', padding: '3px 7px' }}
        >
          {listName}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" columnGap={2}>
        {!id && (
          <Link
            p="6px 8px"
            color="secondary"
            component={RouterLink}
            to={`${listId}`}
            sx={{ textDecoration: 'none' }}
          >
            Open list
          </Link>
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
      </Box>
    </ListSubheader>
  );
}
