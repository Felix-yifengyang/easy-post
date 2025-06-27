import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'

export function useLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setLoading(true)
      const { data } = await login(values);
      localStorage.setItem('token', data.access_token);
      navigate('/profile')
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, handleSubmit }
}