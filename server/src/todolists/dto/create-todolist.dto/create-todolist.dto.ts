export class CreateTodolistDto {
  readonly listName: string;
  readonly expiringDate: string;
  readonly todos: string[];
}
//     id: 1,
//     listName: 'Upcoming',
//     expiringDate: '29 Jan 2023, 19:42',
//     items: [
//       {
//         id: 1,
//         text: 'Join Infinity community for help',
//         isDone: true,
//         created: '8 Jan 2023, 19:42',
//         expiringDate: '29 Jan 2023, 19:42',
//       },
