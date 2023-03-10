import { useState, useEffect } from 'react';
import { object, string, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTime } from 'luxon';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import localStorageApi from '../../services/localStorageApi';
import { createTodoList } from '../../services/todoApi';
import DeleteIcon from '@mui/icons-material/Delete';

interface FormFields {
  listName: string;
  expiringDate: DateTime;
  task: string;
}

interface Task {
  text: string;
}

const schema = object({
  listName: string().required(),
  expiringDate: date(),
  task: string().required(),
});

export default function CreateTodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { handleSubmit, control, watch, setValue, reset, getValues } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  useFormPersist('createTodoForm', {
    watch,
    setValue,
    storage: window.localStorage,
  });

  useEffect(() => {
    const savedTasks = localStorageApi.load('tasks');
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const todo = {
      expiringDate: data.expiringDate,
      listName: data.listName,
      todos: [{ text: data.task }, ...tasks],
    };

    const response = await createTodoList(todo);
    if (response?.statusText === 'created') {
      localStorageApi.remove('createTodoForm');
      localStorageApi.remove('tasks');
      reset();
    }
  };

  const handleAddTask = () => {
    const value = getValues('task');

    if (value.length > 0) {
      const updatedTasks = [...tasks, { text: value }];
      setTasks(updatedTasks);
      reset({ task: '' });
      localStorageApi.save('tasks', updatedTasks);
    }
  };

  const handleRemoveTask = (index: number) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
    localStorageApi.save('tasks', tasksCopy);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 48px - 56px)"
    >
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
          render={({ field: { onChange, value, ref } }) => (
            <DesktopDatePicker
              disableMaskedInput
              label="Due date"
              value={value}
              onChange={onChange}
              inputRef={ref}
              minDate={DateTime.now()}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          )}
        />
        {tasks.length > 0 &&
          tasks.map((task, index) => {
            return (
              <Box key={index} display="flex">
                <TextField label="task" disabled value={task.text} size="small" fullWidth />
                <IconButton
                  onClick={() => {
                    handleRemoveTask(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          })}
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
          <Button
            type="button"
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAddTask}
          >
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
