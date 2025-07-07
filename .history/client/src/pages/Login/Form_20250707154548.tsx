import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import '../../styles/login/form.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function LoginForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setLoading(true)
      const tokenData = await login(values);
      localStorage.setItem('token', tokenData.access_token);
      navigate('/profile')
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }

  const [form] = Form.useForm()
  const onFinish = (values: { username: string; password: string }) => {
    handleSubmit(values)
  }
  return (
    <Form 
      form={form} 
      onFinish={onFinish} 
      initialValues={{ username: '', password: '' }} 
      className="login-form"
    >
      <Form.Item name="username" className="form-item">
        <Input 
          placeholder="请输入用户名..." 
          prefix={<UserOutlined />} 
        />
      </Form.Item>
      <Form.Item name="password" className="form-item">
        <Input.Password 
          placeholder="请输入用密码..." 
          prefix={<LockOutlined />} 
        />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit" className="login-button">
        登录
      </Button>
    </Form>
  )
  }
