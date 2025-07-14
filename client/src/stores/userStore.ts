import { create } from 'zustand';
import { fetchUserProfile } from '../api/users.model';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  posts?: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface UserStore {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await fetchUserProfile();
      set({ user: data, loading: false });
    } catch {
      set({ error: '获取用户信息失败', loading: false });
    }
  },
}));
