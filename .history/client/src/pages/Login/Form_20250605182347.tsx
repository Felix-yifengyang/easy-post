import { Button, Form, Input } from 'antd'
import { useLogin } from './hooks'

export default function LoginForm() {
  const { loading, handleSubmit } = useLogin()

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username">
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        登录
      </Button>
    </Form>
  )
  }