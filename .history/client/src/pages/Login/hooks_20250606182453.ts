import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'

export function useLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setLoading(true)
      await login(values)
      navigate('/profile')
    } finally {
      setLoading(false)
    }
  }

  return { loading, handleSubmit }
}