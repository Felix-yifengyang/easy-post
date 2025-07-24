import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoCard from './userInfoCard';
import UserPostsList from './userPostsList';
import { useUserStore } from '../../stores/userStore';
import styles from '../../styles/profile/profile.module.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, error, fetchUser, initialized } = useUserStore();

  useEffect(() => {
    if (!initialized && !loading) {
      fetchUser();
    }
  }, [fetchUser, initialized, loading]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div className={`${styles.profilePage} ${user ? styles.profilePageLoggedIn : styles.profilePageLoggedOut} max-w-2xl mx-auto mt-8`}>
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
