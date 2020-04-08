import { MinLength } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto {
  @MinLength(8)
  readonly password: string;
}
