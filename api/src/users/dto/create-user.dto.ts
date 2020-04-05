import { Matches } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto {
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  readonly password: string;
}
