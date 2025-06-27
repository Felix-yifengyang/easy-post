import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entites/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PostResponseDto[]> {
    const posts = await this.postsRepository.find({
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return posts.map((post) => this.toResponseDto(post));
  }

  async findByAuthor(
    authorId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PostResponseDto[]> {
    const posts = await this.postsRepository.find({
      where: { author: { id: authorId } },
      relations: ['author'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return posts.map((post) => this.toResponseDto(post));
  }

  async create(
    createPostDto: CreatePostDto,
    author: User,
  ): Promise<PostResponseDto> {
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });
    const savedPost = await this.postsRepository.save(post);
    return this.toResponseDto(savedPost);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUser: User,
  ): Promise<PostResponseDto> {
    const post = await this.postsRepository.findOne({
      where: { id, author: { id: currentUser.id } },
    });
    if (!post) throw new NotFoundException('Post not found or unauthorized');

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postsRepository.save(post);
    return this.toResponseDto(updatedPost);
  }

  async remove(id: number, currentUser: User): Promise<void> {
    const result = await this.postsRepository.delete({
      id,
      author: { id: currentUser.id },
    });
    if (result.affected === 0) {
      throw new NotFoundException('Post not found or unauthorized');
    }
  }

  private toResponseDto(post: Post): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
