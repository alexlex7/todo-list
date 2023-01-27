import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { login, token } from '../../services/authApi';
import { useAuthContext } from '../../context/authContext';
import { useEffect } from 'react';
import localStorageApi from '../../services/localStorageApi';
import { toast } from 'react-toastify';

interface FormFields {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
});

export default function LoginPage() {
  const { control, handleSubmit } = useForm<FormFields>({ resolver: yupResolver(schema) });
  const auth = useAuthContext();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await login(data);
    auth?.changeAuthInfo({ ...auth.authInfo, isLoggedIn: true, ...response });
    toast.success(`Logged in as ${response?.email}`);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 48px)',
      }}
      disableGutters
    >
      <Box
        display={'flex'}
        flexDirection="column"
        justifyContent={'center'}
        rowGap={4}
        width="500px"
        p={6}
        sx={{
          borderRadius: '20px',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        }}
      >
        <Typography textAlign={'center'} variant="h5">
          Authentication
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          display={'flex'}
          flexDirection="column"
          rowGap={4}
        >
          <Controller
            control={control}
            name="email"
            defaultValue={''}
            render={({ field: { onChange, value, ref }, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                label="Email"
                type={'email'}
                onChange={onChange}
                value={value}
                inputRef={ref}
                size="medium"
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, value, ref }, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                label="Password"
                type="password"
                onChange={onChange}
                value={value}
                inputRef={ref}
                size="medium"
                fullWidth
              />
            )}
          />

          <Box
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            rowGap={2}
            pl={6}
            pr={6}
          >
            <Button type="submit" variant="contained" size="large" fullWidth>
              Log in
            </Button>
            <Link component={RouterLink} to="/registration" color={'secondary'}>
              Or sign up, if you don't have account
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
