import { Button, Form, Input } from 'antd'

export default function LoginForm() {
    return (
      <Form>
        <Form.Item name="username">
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form>
    )
  }