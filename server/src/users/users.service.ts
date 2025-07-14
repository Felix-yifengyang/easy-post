import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findForAuthByIdentifier(identifier: string): Promise<User | null> {
    // 供auth模块调用
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier },
        { phone: identifier },
      ],
    });
  }

  async create(userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async findProfileById(id: number): Promise<{
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    posts: Array<{
      id: number;
      title: string;
      content: string;
      authorId: number;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts', 'posts.author'],
    });

    if (!user) throw new NotFoundException('用户不存在');

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      posts: user.posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
    };
  }
}
