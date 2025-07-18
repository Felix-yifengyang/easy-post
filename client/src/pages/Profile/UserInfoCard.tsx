import { Avatar } from 'antd';
import cardStyles from '../../styles/profile/userInfoCard.module.css';

interface UserInfoCardProps {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export default function UserInfoCard({
  id,
  username,
  email,
  createdAt,
}: UserInfoCardProps) {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.content}>
        <Avatar size={64} className={cardStyles.avatar}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <div className={cardStyles.userInfo}>
          <h1 className={cardStyles.username}>{username}</h1>
          <p className={cardStyles.email}>{email}</p>
          <p>Joined: {new Date(createdAt).toLocaleString()}</p>
          <p>uid: {id}</p>
        </div>
      </div>
    </div>
  );
}
