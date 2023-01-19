import axios from 'axios';

export async function getTodoLists() {
  try {
    const data = await axios.get('http://localhost:3000/todolists');
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodoListById(id: string) {
  try {
    const data = await axios.get(`http://localhost:3000/todolists/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
