import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3010/api',
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    if (err.response.status == 400) {
      alert(err.response.data.message.join('\n\n'));
    } else alert('Request error');
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (config) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    if (err.response.status == 400) {
      alert(err.response.data.message.join('\n\n'));
    } else if (err.response.status == 422) {
      alert(err.response.data.message);
    } else alert('Request error');

    throw err;
  },
);
