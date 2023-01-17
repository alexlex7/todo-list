import { object, string, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTime } from 'luxon';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface FormFields {
  listName: string;
  expiringDate: DateTime;
  task: string;
}

const schema = object({
  listName: string().required(),
  expiringDate: date().min(DateTime.now()),
  task: string().required(),
});

export default function CreateTodoListPage() {
  const { handleSubmit, control } = useForm<FormFields>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 48px)">
      <Box
        component="form"
        p={6}
        display="flex"
        flexDirection="column"
        rowGap={3}
        minWidth="500px"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          borderRadius: '20px',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        }}
      >
        <Controller
          control={control}
          name="listName"
          defaultValue={''}
          render={({ field: { onChange, value, ref }, fieldState: { error, invalid } }) => (
            <TextField
              error={invalid}
              helperText={error?.message}
              label="List name"
              onChange={onChange}
              value={value}
              inputRef={ref}
              size="small"
            />
          )}
        />
        <Controller
          control={control}
          name="expiringDate"
          defaultValue={DateTime.now()}
          render={({ field: { onChange, value, ref } }) => (
            <DesktopDatePicker
              label="Due date"
              value={value}
              onChange={onChange}
              inputRef={ref}
              minDate={DateTime.now()}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          )}
        />
        <Controller
          control={control}
          name="task"
          defaultValue={''}
          render={({ field: { onChange, value, ref }, fieldState: { error, invalid } }) => (
            <TextField
              label="task"
              value={value}
              onChange={onChange}
              inputRef={ref}
              error={invalid}
              helperText={error?.message}
              size="small"
            />
          )}
        />
        <Box display="flex" justifyContent="space-around">
          <Button type="button" variant="contained" color="secondary" size="small">
            Add task
          </Button>
          <Button type="submit" variant="contained" size="small">
            Create todo list
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
