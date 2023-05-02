import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/OrderItem.entity';
import { Order } from 'src/entities/order.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/orderDto';
import { User } from 'src/entities/user.entity';
import { Shop } from 'src/entities/shop.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly userService: UserService,
  ) {}

  async getAllOrders() {
    return await this.orderRepo.find({
      relations: {
        items: true,
        userId: true,
      },
    });
  }

  async getOrdersByUser(userId: string) {
    return await this.orderRepo.find({
      where: {
        userId: {
          id: userId,
        },
      },
      relations: ['items'],
    });
  }

  async getOrdersByShop(shop: Shop) {
    return await this.orderItemRepo.find({
      where: {
        shopId: {}
      },
      relations: ['items'],
    });
  }

  async getOrderById(orderId: string) {
    return await this.orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: ['items'],
    });
  }

  async createOrder(user: User, data: CreateOrderDto) {
    let userExists = await this.userService.user(user.id);
    if (!userExists) {
      throw new NotFoundException('User Not Found');
    }

    const items = [];
    for (let item of data.items) {
      const res = this.orderItemRepo.create(item);
      await this.orderItemRepo.save(res);
      items.push(res);
    }

    const order = this.orderRepo.create({
      ...data,
      userId: userExists,
      items,
    });

    await this.orderRepo.save(order);

    return order;
  }

  async updateOrder(
    userId: string,
    orderId: string,
    data: Partial<CreateOrderDto>,
  ) {
    let user = await this.userService.user(userId);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const items = [];
    for (let item of data.items) {
      const res = this.orderItemRepo.create(item);
      await this.orderItemRepo.save(res);
      items.push(res);
    }

    const order = this.orderRepo.create({
      ...data,
      items,
    });

    await this.orderRepo.save(order);

    return order;
  }

  async deleteOrder(orderId: string) {
    return await this.orderRepo.delete(orderId);
  }
}
