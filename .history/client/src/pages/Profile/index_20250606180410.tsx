import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
    id: number;
    username: string;
    email: string;
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
}