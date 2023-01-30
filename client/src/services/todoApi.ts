import axios from 'axios';
import { CreateTodoLists } from '../interfaces';

axios.defaults.baseURL = 'http://localhost:3000';

export async function getTodoLists(limit: number, offset: number) {
  const searchQuery = offset > 0 ? `?limit=${limit}&offset=${offset}` : `?limit=${limit}`;
  try {
    const { data } = await axios.get(`/todolists${searchQuery}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodoListById(id: string) {
  try {
    const data = await axios.get(`/todolists/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createTodoList(todoList: CreateTodoLists) {
  try {
    const response = await axios.post('/todolists', todoList);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function removeTodoList(id: string) {
  try {
    const response = await axios.delete(`/todolists/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    }
  }
}
