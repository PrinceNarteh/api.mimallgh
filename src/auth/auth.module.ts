import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ShopJwtStrategy } from './strategies/jwt-strategy';
import { ShopLocalStrategy } from './strategies/local-strategy';
import { ShopRefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SHOP_JWT_SECRET}`,
      signOptions: { expiresIn: '15m' },
    }),
    ShopModule,
    UserModule,
  ],
  providers: [
    AuthService,
    ShopLocalStrategy,
    ShopJwtStrategy,
    ShopRefreshJwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
