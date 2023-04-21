import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class ShopJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      shopCode: payload.shopCode,
    };
  }
}
