import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
  @ApiProperty({ example: 'john', description: '用户名搜索', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'example.com',
    description: '邮箱搜索',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 1, description: '页码', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, description: '每页数量', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
