import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Box } from '@mui/material';

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/todolist');
    }
  }, []);
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Outlet />
    </Box>
  );
}
