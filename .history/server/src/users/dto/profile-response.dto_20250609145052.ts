import { ApiProperty } from '@nestjs/swagger';
import { PostResponseDto } from '../../posts/dto/post-response.dto';

export class UserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: [PostResponseDto] })
  posts: PostResponseDto[];
}
