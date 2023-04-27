import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/OrderItem.entity';
import { Order } from 'src/entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), UserModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
