import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserService } from 'src/modules/users/user.service';
import { CreateOrderDto } from './dto/orderDto';
import { Order, Prisma, User } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllOrders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        items: true,
      },
    });
  }

  async getOrdersByUser(
    userId: string,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.OrderWhereUniqueInput;
      where?: Prisma.OrderWhereInput;
      orderBy?: Prisma.OrderOrderByWithRelationInput;
    },
  ): Promise<Order[]> {
    const { skip, take, cursor, orderBy } = params;
    return await this.prismaService.order.findMany({
      where: {
        userId,
      },
      skip,
      take,
      cursor,
      orderBy,
      include: {
        items: true,
      },
    });
  }

  async getOrdersByShop(
    userId: string,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.OrderWhereUniqueInput;
      where?: Prisma.OrderWhereInput;
      orderBy?: Prisma.OrderOrderByWithRelationInput;
    },
  ): Promise<Order[]> {
    const { skip, take, cursor, orderBy } = params;
    return await this.prismaService.order.findMany({
      where: {
        userId,
      },
      skip,
      take,
      cursor,
      orderBy,
      include: {
        items: true,
      },
    });
  }

  async getOrderById(orderId: string) {
    return await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
      },
    });
  }

  async createOrder(user: User, createOrderDto: any) {
    let userExists = await this.userService.user(user.id);
    if (!userExists) {
      throw new NotFoundException('User Not Found');
    }

    const order = await this.prismaService.order.create({
      data: {
        ...createOrderDto,
        items: {
          createMany: createOrderDto.items,
        },
      },
    });

    return order;
  }

  async updateOrder(userId: string, orderId: string, data: any) {
    let user = await this.userService.user(userId);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const order = await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...data,
        items: {
          deleteMany: {
            id: orderId,
          },
          createMany: {
            data: {
              ...data.items,
            },
          },
        },
      },
    });

    return order;
  }

  async deleteOrder(orderId: string) {
    return await this.prismaService.order.delete({ where: { id: orderId } });
  }
}
