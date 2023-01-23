import { useEffect, useState, useRef } from 'react';
import { Box, Pagination } from '@mui/material';
import { TodoLists } from '../../interfaces';
import { getTodoLists } from '../../services/todoApi';

interface Props {
  setTodos(data: TodoLists[]): void;
  limit: number;
}

export default function TodoPagination({ setTodos, limit }: Props) {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const prevLimit = useRef(3);
  const offset = (page - 1) * limit;
  const paginationCount = Math.ceil(count / limit);

  useEffect(() => {
    if (prevLimit.current !== limit) {
      setPage(1);
      prevLimit.current = limit;
    }
  });

  useEffect(() => {
    (async () => {
      const { todoLists, totalCount } = await getTodoLists(limit, offset);
      setTodos(todoLists);
      setCount(totalCount);
    })();
  }, [limit, offset]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setPage(page);
  };

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Pagination page={page} count={paginationCount} onChange={handlePageChange} />
    </Box>
  );
}
