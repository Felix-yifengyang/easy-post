import { Avatar, Card } from 'antd';

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
      <div className="flex items-center mb-6">
        <Avatar size={64} className="bg-blue-500">
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">
            {username}
          </h1>
          <p className="text-gray-500">{email}</p>
          <p>Joined: {new Date(createdAt).toLocaleString()}</p>
          <p>uid: {id}</p>
        </div>
      </div>
    </Card>
  );
}