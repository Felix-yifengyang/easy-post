import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return {
      access_token: await this.authService.login(
        loginDto.username,
        loginDto.password,
      ),
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request) {
    return req.user;
  }
}
