import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: '用户ID' })
  id: number;

  @ApiProperty({ example: 'john_doe', description: '用户名' })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: '邮箱' })
  email: string;

  @ApiProperty({ example: 'John', description: '名字', nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Doe', description: '姓氏', nullable: true })
  lastName: string | null;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: '更新时间' })
  updatedAt: Date;
}
