import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, ShopModule],
})
export class AppModule {}
