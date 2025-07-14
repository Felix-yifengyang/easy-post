import request from '../utils/request'

export interface LoginResponse {
  access_token: string;
}

export const login = (data: { identifier: string; password: string }) => {
  return request.post<LoginResponse>('/auth/login', data).then(res => res.data)
}
