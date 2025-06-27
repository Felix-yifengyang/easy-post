import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResponseDto implements Record<string, any> {
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
