import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findForAuthByIdentifier(identifier: string): Promise<User | null> {
    // 供auth模块调用
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier },
        { phone: identifier },
      ],
    });
  }
}
