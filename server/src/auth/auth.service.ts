import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    identifier: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findForAuthByIdentifier(identifier);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('用户名/邮箱/手机号或密码错误');
    }
    const payload = {
      sub: user.id.toString(),
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
