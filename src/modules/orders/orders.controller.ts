import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ShopJwtGuard } from 'src/modules/shop-auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/orderDto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async getOrders(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    return this.orderService.getAllOrders({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy,
      },
    });
  }

  @Get(':orderId')
  async getOrderById(@Param() orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  @Get(':userId/user')
  async getOrdersByUser(
    @Param() orderId: string,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    return this.orderService.getOrdersByUser(orderId, {
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy,
      },
    });
  }

  @UseGuards(ShopJwtGuard)
  @Get(':userId/shop')
  async getOrdersByShop(
    @Param('shopId') shopId: string,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    return this.orderService.getOrdersByShop(shopId, {
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy,
      },
    });
  }

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(req.user, createOrderDto);
  }

  @Delete(':orderId')
  async deleteOrder(@Param() orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }
}
