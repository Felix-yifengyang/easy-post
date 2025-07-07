import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img 
          src="/src/pages/login/src/easy_icon.png" 
          className="login-icon" 
          alt="easy-post" 
        />
      </div>
      <Avatar 
        size="large" 
        icon={<UserOutlined />}
        onClick={() => navigate('/login')}
        style={{ cursor: 'pointer' }}
      />
    </header>
  )
}