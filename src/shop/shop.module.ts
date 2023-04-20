import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopController } from './shop.controller';
import { Shop } from '../entities/shop.entity';
import { ShopService } from './shop.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule],
  controllers: [ShopController],
  exports: [ShopService],
  providers: [ShopService],
})
export class ShopModule {}
