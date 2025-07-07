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
        <Avatar size="large" src={<img src={"/src/pages/login/src/easy_icon.png"} alt="home" />} />
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