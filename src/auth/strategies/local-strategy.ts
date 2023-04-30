import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class ShopLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private shopService: AuthService) {
    super({
      usernameField: 'shopCode',
    });
  }

  async validate(shopCode: string, password: string) {
    const shop = await this.shopService.validateUser(shopCode, password);
    if (!shop) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return shop;
  }
}
