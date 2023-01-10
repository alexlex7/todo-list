import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Header from '../../components/Header/Header';
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher';
import ListView from '../../components/ListView/ListView';
import CardView from '../../components/CardView/CardView';

export default function MainPage() {
  const [view, setView] = useState('card');
  const todoLists = [
    {
      id: 1,
      listName: 'Upcoming',
      items: [
        {
          id: 1,
          text: 'Join Infinity community for help',
          isDone: true,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 2,
          text: 'Join Infinity community for help',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 3,
          text: 'Add new tasks',
          isDone: true,
          created: '7 Jan 2023, 19:42',
          expiringDate: '28 Jan 2023, 19:42',
        },
        {
          id: 4,
          text: 'Assign tasks to team members',
          isDone: false,
          created: '5 Jan 2023, 19:42',
          expiringDate: '27 Jan 2023, 19:42',
        },
      ],
    },
    {
      id: 2,
      listName: 'To Do',
      items: [
        {
          id: 5,
          text: 'Create a few folders to make a hierarchy',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 6,
          text: 'Add some tabs to a folder if you want to see the same items in a different way',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 7,
          text: 'Use grouping options to group items by labels, members or state',
          isDone: true,
          created: '7 Jan 2023, 19:42',
          expiringDate: '28 Jan 2023, 19:42',
        },
        {
          id: 8,
          text: 'Filter items you don&quot;t want to see',
          isDone: false,
          created: '5 Jan 2023, 19:42',
          expiringDate: '27 Jan 2023, 19:42',
        },
      ],
    },
    {
      id: 3,
      listName: 'Doing',
      items: [
        {
          id: 5,
          text: 'Create a few folders to make a hierarchy',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 6,
          text: 'Add some tabs to a folder if you want to see the same items in a different way',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 7,
          text: 'Use grouping options to group items by labels, members or state',
          isDone: false,
          created: '7 Jan 2023, 19:42',
          expiringDate: '28 Jan 2023, 19:42',
        },
        {
          id: 8,
          text: 'Filter items you don&quot;t want to see',
          isDone: false,
          created: '5 Jan 2023, 19:42',
          expiringDate: '27 Jan 2023, 19:42',
        },
      ],
    },
    {
      id: 4,
      listName: 'Done',
      items: [
        {
          id: 5,
          text: 'Create a few folders to make a hierarchy',
          isDone: false,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 6,
          text: 'Add some tabs to a folder if you want to see the same items in a different way',
          isDone: true,
          created: '8 Jan 2023, 19:42',
          expiringDate: '29 Jan 2023, 19:42',
        },
        {
          id: 7,
          text: 'Use grouping options to group items by labels, members or state',
          isDone: false,
          created: '7 Jan 2023, 19:42',
          expiringDate: '28 Jan 2023, 19:42',
        },
        {
          id: 8,
          text: 'Filter items you don&quot;t want to see',
          isDone: true,
          created: '5 Jan 2023, 19:42',
          expiringDate: '27 Jan 2023, 19:42',
        },
      ],
    },
  ];

  function handleChange(_, nextView) {
    setView(nextView);
  }
  return (
    <>
      <Header />
      <Box
        sx={{
          borderBottom: 1,
          borderBottomColor: 'grey.200',
          pl: 2,
          pr: 2,
        }}
      >
        <Container maxWidth={'lg'} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ViewSwitcher view={view} handleChangeView={handleChange} />
        </Container>
      </Box>
      <Container disableGutters>
        {view === 'list' && <ListView todoLists={todoLists} />}
        {view === 'card' && <CardView todoLists={todoLists} />}
        <Outlet />
      </Container>
    </>
  );
}
