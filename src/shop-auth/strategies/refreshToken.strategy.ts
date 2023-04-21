import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshShopJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
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
