import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User) {
    const payload = _.pick(user, ['_id', 'userName']);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ password, ...rest }: CreateUserDto) {
    const user = await this.usersService.create(rest);
    user.setPassword(password);

    return await user.save();
  }

  async validate(userName: string, password: string) {
    const user = await this.usersService.getCredsFields(userName);
    if (!user) throw new UnauthorizedException();

    return user.checkPassword(password);
  }
}
