import { Outlet, useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/settingsContext';
import Header from '../../components/Header/Header';
import { Box, Button, Container, Typography } from '@mui/material';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher';

export default function MainPage() {
  const location = useLocation();
  const settings = useSettings();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: 'grey.200',
          pl: 2,
          pr: 2,
        }}
      >
        <Container
          maxWidth={'lg'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '56px',
          }}
        >
          <Box display={'flex'} columnGap={2} alignItems={'center'}>
            {location.pathname !== '/' && (
              <Button variant="outlined" color="secondary" onClick={handleClick}>
                Previous page
              </Button>
            )}
            <Breadcrumbs />
          </Box>
          <Box>
            {location.pathname === '/todolist' && (
              <Box display="flex" alignItems="center">
                <Button component={RouterLink} to="todolist/create" variant="contained">
                  Create todo
                </Button>
                {settings && (
                  <ViewSwitcher
                    view={settings.view}
                    handleChangeView={settings.toggleView}
                    setItemsOnPage={(event) => {
                      settings?.changeItemsOnPage(Number(event.target.value));
                    }}
                    itemsOnPage={String(settings.itemsOnPage)}
                  />
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      {location.pathname === '/' && (
        <Box
          minHeight="calc(100vh - 48px - 56px)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rowGap="20px"
        >
          <Typography variant="h3">Todo app</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="todolist"
            sx={{ color: 'grey.900' }}
          >
            Todo lists page
          </Button>
        </Box>
      )}
      <Outlet />
    </Box>
  );
}
