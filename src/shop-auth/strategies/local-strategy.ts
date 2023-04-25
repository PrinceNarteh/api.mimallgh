import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ShopAuthService } from '../shop-auth.service';

@Injectable()
export class ShopLocalStrategy extends PassportStrategy(
  Strategy,
  'local',
) {
  constructor(private authService: ShopAuthService) {
    super({
      usernameField: 'shopCode',
    });
  }

  async validate(shopCode: string, password: string) {
    const user = await this.authService.validateShop(shopCode, password);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
