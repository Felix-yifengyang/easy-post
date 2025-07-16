import { Divider, List } from 'antd';
import list from '../../styles/profile/userPostsList.module.css';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

interface UserPostsListProps {
  posts: Post[];
}

export default function UserPostsList({ posts }: UserPostsListProps) {
  return (
    <>
      <Divider>Posts ({posts.length})</Divider>
      <List
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <List.Item.Meta
              title={post.title}
              description={post.content}
            />
            <div className={list.postDate}>
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
