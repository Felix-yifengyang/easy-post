import { Button, Form, Input } from 'antd'
import { useLogin } from './hooks'
import '../../styles/login/form.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default function LoginForm() {
  const { loading, handleSubmit } = useLogin()
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
