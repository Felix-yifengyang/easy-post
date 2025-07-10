import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

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

  @Column({ unique: true, length: 20 })
  phone: string;

  @Column({ nullable: true })
  realName: string;

  @Column({ nullable: true })
  idCard: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: ['0', '1'], nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
