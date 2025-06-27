import API from './client'

export interface LoginResponse {
  access_token: string;
}

export const login = (data: { username: string; password: string }) => {
  return API.post<LoginResponse>('/auth/login', data)
}