import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoCard from './userInfoCard';
import UserPostsList from './userPostsList';
import { useUserStore } from '../../stores/userStore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <UserInfoCard
        id={user.id}
        username={user.username}
        email={user.email}
        createdAt={user.createdAt}
      />
      <UserPostsList posts={user.posts || []} />
    </div>
  );
}
