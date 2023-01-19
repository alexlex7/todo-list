import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../../components/ListView/ListView';
import { TodoLists } from '../../interfaces';
import { getTodoListById } from '../../services/todoApi';

export default function ShowTodo() {
  const [todoItem, setTodoItem] = useState<TodoLists | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          throw new Error('Incorrect id');
        }
        const response = await getTodoListById(id);
        if (response) {
          setTodoItem(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return <>{todoItem && <ListView todoLists={[todoItem]} />}</>;
}
