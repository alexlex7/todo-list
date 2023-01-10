import { logo } from './assets';
import { Box, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 2,
        bgcolor: 'primary.main',
        pt: 1,
        pb: 1,
      }}
    >
      <img src={logo} alt="logo" />
      <Typography variant="h6" component="h1" sx={{ color: 'common.white' }}>
        Todos
      </Typography>
    </Box>
  );
}
