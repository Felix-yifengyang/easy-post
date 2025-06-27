import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: 1, description: '帖子ID' })
  id: number;

  @ApiProperty({ example: '我的第一篇帖子', description: '帖子标题' })
  title: string;

  @ApiProperty({ example: '这是帖子内容...', description: '帖子正文' })
  content: string;

  @ApiProperty({ example: 1, description: '作者用户ID' })
  authorId: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '创建时间',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '更新时间',
  })
  updatedAt: Date;
}
