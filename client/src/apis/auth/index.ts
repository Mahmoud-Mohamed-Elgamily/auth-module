import { axiosInstance } from '../../config/axios';

export const signIn = async (
  email: string,
  password: string,
  remember: boolean,
) => {
  const token = await axiosInstance.post('/auth/login', { email, password });
  if (token) {
    remember
      ? localStorage.setItem('token', JSON.stringify(token))
      : sessionStorage.setItem('token', JSON.stringify(token));

    window.location.href = '/';
    console.log('s', window.location.href);
  } else {
    alert('wrong credentials');
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  const token = await axiosInstance.post('/auth/register', {
    email,
    password,
    name,
  });
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
    window.location.href = '/';
    console.log('ss', window.location.href);
  } else {
    alert('wrong credentials');
  }
};
