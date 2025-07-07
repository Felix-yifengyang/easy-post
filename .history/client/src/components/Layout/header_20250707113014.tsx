import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/custom.module.css'

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className={styles.header} 
    >
      <Avatar 
        size={40}
        src={<img src={"/src/pages/login/src/easy_icon.png"} alt="home" />} 
        onClick={() => navigate('/')} 
        className={styles.avatar}
      />
      <Avatar 
        size={'large'}
        icon={<UserOutlined />}
        onClick={() => navigate('/login')}
        className={styles.avatar}
      />
    </header>
  )
}