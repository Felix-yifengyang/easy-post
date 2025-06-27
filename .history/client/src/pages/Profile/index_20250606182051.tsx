import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../api/users';
import UserProfileCard from './UserInfoCard';
import UserPostsList from './UserPostsList';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  posts: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    loadProfile();
  }, [navigate]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <UserProfileCard
        username={profile.username}
        firstName={profile.firstName}
        email={profile.email}
        createdAt={profile.createdAt}
      />
      <UserPostsList posts={profile.posts} />
    </div>
  );
}