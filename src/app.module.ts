import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ShopModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
  ],
})
export class AppModule {}
