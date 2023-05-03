import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopController],
  exports: [ShopService],
  providers: [ShopService],
})
export class ShopModule {}
