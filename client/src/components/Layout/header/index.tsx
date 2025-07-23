import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import headerStyles from '../../../styles/components/layout/header.module.css';
import { useUserStore } from '../../../stores/userStore';
import { useReactive } from 'ahooks';
import MoonIcon from '../../../assets/card/moon.svg?react';
import SunIcon from '../../../assets/card/sun.svg?react';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useUserStore();
    const state = useReactive({
      isHover: false,
  })
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
    <header className={`${headerStyles.header} ${user ? headerStyles.headerLoggedIn : headerStyles.headerLoggedOut}`}>
      <div className={headerStyles.logoWrapper} onClick={() => navigate('/')}>
        <Avatar 
          size={50}
          src={<img src={"/easy_icon.svg"} alt="home" />}
        />
      </div>
      {!loading && (
        user ? (
          <Dropdown menu={{ items }}>
            <div 
              className={headerStyles.iconContainer}
              onMouseEnter={() => { state.isHover = true }}
              onMouseLeave={() => { state.isHover = false }}
            >
              <SunIcon className={headerStyles.icon} />
              {state.isHover && (
                <div 
                  className={headerStyles.avatarOverlay}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!window.location.pathname.includes('/profile')) {
                      navigate('/profile');
                    }
                  }}
                >
                  <Avatar 
                    size={30}
                    src={user?.avatar}
                    className={headerStyles.avatarImage}
                  >
                    {!user?.avatar && user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
              )}
            </div>
          </Dropdown>
        ) : (
          <div 
            className={headerStyles.iconContainer}
            onClick={() => navigate('/login')}
          >
            <MoonIcon 
              className={headerStyles.icon}
                onMouseEnter={(e) => {
                  const moonSvg = e.currentTarget;
                  const paths = moonSvg.querySelectorAll('path');
                  if(paths.length > 0) {
                    paths[0].remove();
                    moonSvg.style.filter = 'drop-shadow(0 0 8px #ffcc00)';
                  }
                }}
                onMouseLeave={(e) => {
                  const moonSvg = e.currentTarget;
                  const paths = moonSvg.querySelectorAll('path');
                  if(paths.length === 1) {
                    const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    newPath.setAttribute('fill-rule', 'evenodd');
                    newPath.setAttribute('clip-rule', 'evenodd');
                    newPath.setAttribute('d', 'M18 2.75C17.5858 2.75 17.25 2.41421 17.25 2C17.25 1.58579 17.5858 1.25 18 1.25H22C22.3034 1.25 22.5768 1.43273 22.6929 1.71299C22.809 1.99324 22.7449 2.31583 22.5304 2.53033L19.8107 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H18C17.6967 6.75 17.4232 6.56727 17.3071 6.28701C17.191 6.00676 17.2552 5.68417 17.4697 5.46967L20.1894 2.75H18ZM13.5 8.75C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.5C16.8034 7.25 17.0768 7.43273 17.1929 7.71299C17.309 7.99324 17.2449 8.31583 17.0304 8.53033L15.3107 10.25H16.5C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75H13.5C13.1967 11.75 12.9232 11.5673 12.8071 11.287C12.691 11.0068 12.7552 10.6842 12.9697 10.4697L14.6894 8.75H13.5Z');
                    newPath.setAttribute('fill', '#ffcc00');
                    moonSvg.insertBefore(newPath, paths[0]);
                    moonSvg.style.filter = 'none';
                  }
                }}
              />
          </div>
        )
      )}
    </header>
  );
}
