import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entites/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar', name: 'first_name', length: 50, nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: true })
  lastName: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[]; // 用户拥有的帖子
}
