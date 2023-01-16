import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../../components/ListView/ListView';
import { TodoLists } from '../../interfaces';
import service from '../../services';

export default function ShowTodo() {
  const [todoItem, setTodoItem] = useState<TodoLists | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await service.getTodoListById(Number(id));
      setTodoItem(response.data);
    })();
  }, [id]);

  return <>{todoItem && <ListView todoLists={[todoItem]} />}</>;
}
