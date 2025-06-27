import { ApiProperty } from '@nestjs/swagger';
import { PostResponseDto } from '../../posts/dto/post-response.dto';

export class UserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  firstName: string | null;

  @ApiProperty({ nullable: true })
  lastName: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [PostResponseDto] })
  posts: PostResponseDto[];
}