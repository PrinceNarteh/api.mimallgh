import { Module } from '@nestjs/common';
import { ShopAuthService } from './shop-auth.service';
import { ShopAuthController } from './shop-auth.controller';
import { ShopJwtStrategy } from './strategies/jwt-strategy';
import { ShopLocalGuard } from './guards/local-auth.guard';
import { ShopService } from 'src/shop/shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Shop } from 'src/entities/shop.entity';
import { RefreshShopJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    ShopService,
    ShopLocalGuard,
    ShopJwtStrategy,
    RefreshShopJwtStrategy,
    ShopAuthService,
  ],
  controllers: [ShopAuthController],
})
export class ShopAuthModule {}
