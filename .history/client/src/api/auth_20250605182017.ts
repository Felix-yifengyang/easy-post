import API from './client'

export const login = (data: { username: string; password: string }) => {
  return API.post('/auth/login', data)
}