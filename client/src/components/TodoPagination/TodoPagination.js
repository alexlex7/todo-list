import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import service from '../../services';
import { Box, Pagination } from '@mui/material';

const pageSize = 3;

export default function TodoPagination({ setTodos }) {
  const [count, setCount] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(pageSize);

  useEffect(() => {
    service.getData({ count, from, to }).then((response) => {
      setCount(response.count);
      setTodos(response.data);
      console.log(response);
    });
  }, [count, from, to, setTodos]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setFrom(from);
    setTo(to);
  };

  const paginationCount = Math.ceil(count / pageSize);
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Pagination count={paginationCount} onChange={handlePageChange} />
    </Box>
  );
}

TodoPagination.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
