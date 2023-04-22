import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserImage } from 'src/entities/userImage.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './shop-auth.controller';
import { ShopAuthService } from './shop-auth.service';
import { ShopJwtStrategy } from './strategies/jwt-strategy';
import { ShopLocalStrategy } from './strategies/local-strategy';
import { ShopRefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from 'src/user/user.module';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserImage]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '15m' },
    }),
    ShopModule,
  ],
  providers: [
    ShopAuthService,
    UserService,
    ShopLocalStrategy,
    ShopJwtStrategy,
    ShopRefreshJwtStrategy,
    UserService,
  ],
  controllers: [AuthController],
})
export class ShopAuthModule {}
