import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-user') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailOrPhoneNumber',
    });
  }

  async validate(emailOrPhoneNumber: string, password: string) {
    const user = await this.authService.validateUser(
      emailOrPhoneNumber,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
