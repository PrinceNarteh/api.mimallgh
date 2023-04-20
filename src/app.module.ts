import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserImageModule } from './user-image/user-image.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    ShopModule,
    TypeOrmModule.forRoot(config),
    UserImageModule,
  ],
})
export class AppModule {}
