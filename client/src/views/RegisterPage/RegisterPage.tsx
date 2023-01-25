import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';

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

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
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
                onChange={onChange}
                value={value}
                inputRef={ref}
                size="medium"
                fullWidth
              />
            )}
          />

          <Box display={'flex'} justifyContent="space-between" pl={2} pr={2}>
            <Button component={Link} to="/login" variant="contained" color="secondary">
              Log in
            </Button>
            <Button type="submit" variant="contained" size="large">
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
