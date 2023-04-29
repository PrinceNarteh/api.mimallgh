import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/orderDto';

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

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(req, createOrderDto);
  }

  @Delete(':orderId')
  async deleteOrder(@Param() orderId: string) {
    return this.orderService.getOrdersByUser(orderId);
  }
}
