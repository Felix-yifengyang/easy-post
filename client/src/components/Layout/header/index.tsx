import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import headerStyles from '../../../styles/components/layout/header.module.css';
import { useUserStore } from '../../../stores/userStore';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useUserStore();
  const items: MenuProps['items'] = [
    {
      key: '1',
      danger: true,
      label: (
        <a>
          <LogoutOutlined /> 退出登录
        </a>
      ),
      onClick: () => {
        useUserStore.getState().logout();
        navigate('/login');
      }
    },
  ]

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.avatarWrapper} onClick={() => navigate('/')}>
        <Avatar 
          size={50}
          src={<img src={"/easy_icon.svg"} alt="home" />}
        />
      </div>
      {!loading && (
        user ? (
          <Dropdown menu={{ items }}>
            <Avatar 
              size={50}
              src={user?.avatar}
              onClick={() => navigate('/profile')}
              className={headerStyles.avatar}
            >
              {!user?.avatar && user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        ) : (
          <Avatar 
            size={50}
            onClick={() => navigate('/login')}
            className={headerStyles.avatar}
            icon={<UserOutlined />}
          />
        )
      )}
    </header>
  );
}
