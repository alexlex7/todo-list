import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import localStorageApi from '../services/localStorageApi';

export interface User {
  email: string;
  password: string;
}

interface IData {
  access_token: string;
  email: string;
}

axios.defaults.baseURL = 'http://localhost:3000';

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export async function login(user: User) {
  let data: IData = { access_token: '', email: '' };
  try {
    const response = await axios.post('/auth/login', user);
    token.set(response.data.access_token);
    data = response.data;
    localStorageApi.save('authInfo', data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.warning(error.response?.data.message);
    }
  }
}

export async function signup(user: User) {
  try {
    const response = await axios.post('/auth/signup', user);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      toast.warning(error?.response?.data?.message);
    }
  }
}

export function logout() {
  localStorageApi.remove('authInfo');
}
