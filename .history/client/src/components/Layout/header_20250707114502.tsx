import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import header from '../../styles/components/layout/header.css'

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className={header.header} 
    >
      <div className={header.avatarWrapper} onClick={() => navigate('/')}>
        <Avatar 
          size={50}
          src={<img src={"/src/pages/login/src/easy_icon.png"} alt="home" />}
        />
      </div>
      <Avatar 
        size={'large'}
        icon={<UserOutlined />}
        onClick={() => navigate('/login')}
        className={header.avatar}
      />
    </header>
  )
}