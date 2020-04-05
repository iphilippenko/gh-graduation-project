import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userName' });
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validate(userName, password);
    if (!user) {
      throw new UnauthorizedException('Invalid userName or password');
    }
    return user;
  }
}
