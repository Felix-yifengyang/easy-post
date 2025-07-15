import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import header from '../../../styles/components/layout/header.module.css';
import { useUserStore } from '../../../stores/userStore';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useUserStore();

  return (
    <header className={header.header}>
      <div className={header.avatarWrapper} onClick={() => navigate('/')}>
        <Avatar 
          size={50}
          src={<img src={"/src/pages/login/src/easy_icon.png"} alt="home" />}
        />
      </div>
      {!loading && (
        <Avatar 
          size={50}
          src={user?.avatar}
          onClick={() => navigate(user ? '/profile' : '/login')}
          className={header.avatar}
          icon={!user && <UserOutlined />}
        >
          {!user?.avatar && user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      )}
    </header>
  );
}
