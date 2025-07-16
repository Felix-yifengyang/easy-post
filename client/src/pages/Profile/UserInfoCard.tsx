import { Avatar, Card } from 'antd';
import card from '../../styles/profile/userInfoCard.module.css';

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
    <Card>
      <div className={card.container}>
        <Avatar size={64} className={card.avatar}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <div className={card.userInfo}>
          <h1 className={card.username}>{username}</h1>
          <p className={card.email}>{email}</p>
          <p>Joined: {new Date(createdAt).toLocaleString()}</p>
          <p>uid: {id}</p>
        </div>
      </div>
    </Card>
  );
}
