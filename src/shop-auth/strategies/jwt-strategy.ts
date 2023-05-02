import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class ShopJwtStrategy extends PassportStrategy(Strategy, 'jwt-shop') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.SHOP_JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, shopCode: payload.shopCode };
  }
}
