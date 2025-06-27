import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  authorId: number; // 不返回整个用户对象，避免循环引用

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}