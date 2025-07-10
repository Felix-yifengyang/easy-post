import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserProfileDto } from './dto/profile-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: QueryUserDto): Promise<[UserResponseDto[], number]> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [users.map((user) => this.toResponseDto(user)), total];
  }

  async findOne(id: number): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOneBy({ id });
    return user ? this.toResponseDto(user) : null;
  }

  async findUsername(username: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOneBy({ username });
    return user ? this.toResponseDto(user) : null;
  }

  async findForAuthByIdentifier(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier },
        { phone: identifier },
      ],
    });
  }

  async findProfileById(id: number): Promise<UserProfileDto | null> {
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

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    const savedUser = await this.usersRepository.save(user);
    return this.toResponseDto(savedUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });
    return this.toResponseDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private toResponseDto(user: User): UserResponseDto {
    const { password, ...userData } = user;
    return userData;
  }
}
