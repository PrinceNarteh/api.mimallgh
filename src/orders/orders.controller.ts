import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ShopJwtGuard } from 'src/shop-auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/orderDto';
import { OrdersService } from './orders.service';
import { Shop } from 'src/entities/shop.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':orderId')
  async getOrderById(@Param() orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  @Get(':userId/user')
  async getOrdersByUser(@Param() orderId: string) {
    return this.orderService.getOrdersByUser(orderId);
  }

  @UseGuards(ShopJwtGuard)
  @Get(':userId/user')
  async getOrdersByShop(@Param() shop: Shop) {
    return this.orderService.getOrdersByShop(shop);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(req.user, createOrderDto);
  }

  @Delete(':orderId')
  async deleteOrder(@Param() orderId: string) {
    return this.orderService.getOrdersByUser(orderId);
  }
}
