import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      alert('请重新登录！');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;