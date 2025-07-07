import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../api/users';
import UserInfoCard from './userInfoCard';
import UserPostsList from './userPostsList';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  posts: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
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
        console.error('Error fetching user profile:', err);
        navigate('/login');
      }
    };
    loadProfile();
  }, [navigate]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <UserInfoCard
        id={profile.id}
        username={profile.username}
        email={profile.email}
        createdAt={profile.createdAt}
      />
      <UserPostsList posts={profile.posts} />
    </div>
  );
}