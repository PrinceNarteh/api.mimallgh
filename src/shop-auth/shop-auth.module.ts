import { Module } from '@nestjs/common';
import { ShopAuthService } from './shop-auth.service';
import { ShopAuthController } from './shop-auth.controller';

@Module({
  providers: [ShopAuthService],
  controllers: [ShopAuthController]
})
export class ShopAuthModule {}
