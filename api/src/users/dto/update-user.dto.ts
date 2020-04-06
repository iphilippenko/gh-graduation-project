import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  @IsString()
  userName: string;

  @IsString()
  avatar: string;
}
