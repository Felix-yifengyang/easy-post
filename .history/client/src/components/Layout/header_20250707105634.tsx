import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <Avatar 
      size="large" 
      icon={<UserOutlined />}
      onClick={() => navigate('/login')}
      style={{ cursor: 'pointer' }}
      />
    </header>
  )
}