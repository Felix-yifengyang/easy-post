// login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
