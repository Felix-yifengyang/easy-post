import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    userData: {
      username: string;
      email: string;
      phone: string;
      password: string;
    },
  ) {
    return this.userService.create(userData);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: Request & { user: User }) {
    return this.userService.findProfileById(req.user.id);
  }
}
