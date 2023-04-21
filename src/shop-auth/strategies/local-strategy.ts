import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ShopAuthService } from '../shop-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private shopAuthService: ShopAuthService) {
    super({
      usernameField: 'shopCode',
    });
  }

  async validate(shopCode: string, password: string) {
    const shop = await this.shopAuthService.validateShop(shopCode, password);
    if (!shop) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return shop;
  }
}
