import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
}