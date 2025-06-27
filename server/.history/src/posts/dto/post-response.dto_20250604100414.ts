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
  authorId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}