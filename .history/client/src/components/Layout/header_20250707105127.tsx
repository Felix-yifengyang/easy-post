import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export default function Header() {
  return (
    <header>
      <Link to="/login">登录</Link>
    </header>
  )
}