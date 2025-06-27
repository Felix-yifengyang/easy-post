import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [PostResponseDto] })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PostResponseDto[]> {
    return this.postsService.findAll(+page, +limit);
  }

  @Get('author/:authorId')
  @ApiResponse({ status: 200, type: [PostResponseDto] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findByAuthor(@Param('authorId') authorId: string,
@Query('page') page = 1,
    @Query('limit') limit = 10,): Promise<PostResponseDto> {
    return this.postsService.findByAuthor(+authorId, +page, +limit);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: PostResponseDto })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
  ): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto, req.user as User);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PostResponseDto })
  @ApiResponse({ status: 404, description: 'Post not found or unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ): Promise<PostResponseDto> {
    return this.postsService.update(+id, updatePostDto, req.user as User);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Post not found or unauthorized' })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    await this.postsService.remove(+id, req.user as User);
  }
}