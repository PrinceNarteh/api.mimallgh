import { Injectable } from '@nestjs/common';
import { Shop, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async shop(
    shopWhereUniqueInput: Prisma.ShopWhereUniqueInput,
  ): Promise<Shop | null> {
    return this.prisma.shop.findUnique({
      where: shopWhereUniqueInput,
    });
  }

  async shops(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShopWhereUniqueInput;
    where?: Prisma.ShopWhereInput;
    orderBy?: Prisma.ShopOrderByWithRelationInput;
  }): Promise<Shop[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shop.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createShop(data: Prisma.ShopCreateInput): Promise<Shop> {
    return this.prisma.shop.create({
      data,
    });
  }

  async updateShop(params: {
    where: Prisma.ShopWhereUniqueInput;
    data: Prisma.ShopUpdateInput;
  }): Promise<Shop> {
    const { where, data } = params;
    return this.prisma.shop.update({
      data,
      where,
    });
  }

  async deleteShop(where: Prisma.ShopWhereUniqueInput): Promise<Shop> {
    return this.prisma.shop.delete({
      where,
    });
  }
}
