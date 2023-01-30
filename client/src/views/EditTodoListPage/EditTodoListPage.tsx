import { useParams } from 'react-router-dom';

export default function EditTodoListPage() {
  const params = useParams();
  console.log(params);
  return <div>EditTodoListPage</div>;
}
