import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 请求拦截器（统一添加 Token）
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器（统一处理错误）
request.interceptors.response.use(
  (response) => response.data, // 直接返回数据部分
  (error) => {
    if (error.response.status === 401) {
      alert('请重新登录！');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;