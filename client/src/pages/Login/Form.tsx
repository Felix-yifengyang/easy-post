import { Button, Form, Input } from 'antd'
import { useReactive } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth.model'
import '../../styles/login/form.css'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { createUser } from '../../api/users.model'

export default function LoginForm() {
  const navigate = useNavigate()
  const state = useReactive({
    loading: false,
    isRegister: false,
  })

  interface LoginValues {
    identifier: string;
    password: string;
  }

  interface RegisterValues {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  const handleSubmit = async (values: LoginValues | RegisterValues) => {
    try {
      state.loading = true;
      if (state.isRegister) {
        await createUser(values as RegisterValues);
        state.isRegister = false;
        form.resetFields();
      } else {
        const tokenData = await login(values as LoginValues);
        localStorage.setItem('token', tokenData.access_token);
        navigate('/profile');
      }
    } catch (e) {
      alert('登录失败，请检查用户名和密码');
      console.error('登录错误:', e);
      form.setFieldsValue({ password: '' });
    } finally {
      state.loading = false;
    }
  }

  const [form] = Form.useForm()
  const onFinish = (values: LoginValues | RegisterValues) => {
    handleSubmit(values)
  }
  return (
    <Form 
      form={form} 
      onFinish={onFinish} 
      initialValues={{ identifier: '', password: '' }} 
      className={`login-form ${state.isRegister ? 'register-mode' : ''}`}
    >
      {!state.isRegister ? (
        <>
          <Form.Item 
            name="identifier" 
            className="form-item"
            rules={[{ required: true, message: '请输入用户名/邮箱/手机号' }]}
          >
            <Input 
              placeholder="请输入用户名/邮箱/手机号..." 
              prefix={<UserOutlined />} 
            />
          </Form.Item>
          <Form.Item 
            name="password" 
            className="form-item"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password 
              placeholder="请输入密码..." 
              prefix={<LockOutlined />} 
            />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            name="username"
            className="form-item"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 4, message: '用户名至少4个字符' }
            ]}
          >
            <Input placeholder="请输入用户名..." prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            className="form-item"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱..." prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="phone"
            className="form-item"
            rules={[
              { required: true, message: '请输入手机号' },
              { 
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入有效的手机号码'
              }
            ]}
          >
            <Input placeholder="请输入手机号..." prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            className="form-item"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password placeholder="请输入密码..." prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            className="form-item"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码..." prefix={<LockOutlined />} />
          </Form.Item>
        </>
      )}
      <Button loading={state.loading} type="primary" htmlType="submit" className="login-button">
        {state.isRegister ? '注册' : '登录'}
      </Button>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        {state.isRegister ? (
          <span>已有账号？<a onClick={() => { state.isRegister = false; form.resetFields(); }}>登录</a></span>
        ) : (
          <span>没有账号？<a onClick={() => { state.isRegister = true; form.resetFields(); }}>注册</a></span>
        )}
      </div>
    </Form>
  )
  }
