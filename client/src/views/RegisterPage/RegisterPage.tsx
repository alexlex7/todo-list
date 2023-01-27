import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signup } from '../../services/authApi';
import { toast } from 'react-toastify';

interface FormFields {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().required(),
  password: string().required(),
});

export default function RegisterPage() {
  const { control, handleSubmit } = useForm<FormFields>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await signup(data);
    if (response?.status === 201) {
      toast.success(response.data.message);
      navigate('/login');
    }
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
          Registration
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
                type="email"
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
            alignItems={'center'}
            rowGap={2}
            pl={6}
            pr={6}
          >
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign up
            </Button>
            <Link component={RouterLink} to="/login" color={'secondary'}>
              Or login, if you already have account
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
