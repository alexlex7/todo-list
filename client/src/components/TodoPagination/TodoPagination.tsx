import { useEffect, useState } from 'react';
// import service from '../../services';
import { Box, Pagination } from '@mui/material';
import { TodoLists } from '../../interfaces';
import { getTodoLists } from '../../services/todoApi';

interface Props {
  setTodos(data: TodoLists[]): void;
  pageSize: number;
}

export default function TodoPagination({ setTodos, pageSize }: Props) {
  const [count, setCount] = useState(0);
  // const [from, setFrom] = useState(0);
  // const [to, setTo] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getTodoLists();
      setTodos(data?.data);
      console.log(data?.data);
    })();
  }, []);
  // useEffect(() => {
  //   setTo(pageSize);
  //   setCount(0);
  //   setFrom(0);
  // }, [pageSize]);

  // useEffect(() => {
  //   service.getData({ from, to }).then((response) => {
  //     setCount(response.count);
  //     setTodos(response.data);
  //   });
  // }, [count, from, to, setTodos]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    // setFrom(from);
    // setTo(to);
  };

  const paginationCount = Math.ceil(count / pageSize);
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Pagination count={paginationCount} onChange={handlePageChange} />
    </Box>
  );
}
