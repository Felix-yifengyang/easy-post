import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import myHeader from '../../styles/components/layout/header.css'

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className={myHeader.header} 
    >
      <div className={myHeader.avatarWrapper} onClick={() => navigate('/')}>
        <Avatar 
          size={50}
          src={<img src={"/src/pages/login/src/easy_icon.png"} alt="home" />}
        />
      </div>
      <Avatar 
        size={'large'}
        icon={<UserOutlined />}
        onClick={() => navigate('/login')}
        className={myHeader.avatar}
      />
    </header>
  )
}