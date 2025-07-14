import request from '../utils/request'

export const fetchUserProfile = () => {
  return request.get('/users/profile');
}

export const createUser = (userData: {
  username: string;
  email: string;
  phone: string;
  password: string;
}) => {
  return request.post('/users', userData);
}
