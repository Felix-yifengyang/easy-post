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
  initialized: boolean;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,
  
  fetchUser: async () => {
    if (get().loading || get().initialized) return;

    set({ loading: true, error: null });
    try {
      const { data } = await fetchUserProfile();
      set({ user: data, loading: false, initialized: true });
    } catch {
      set({ 
        user: null,
        error: '获取用户信息失败', 
        loading: false,
        initialized: true
      });
    }
  },
}));
