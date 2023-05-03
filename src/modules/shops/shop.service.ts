import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Shop } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prismaService: PrismaService) {}

  async shop(id: string): Promise<Shop | null> {
    const shop = await this.prismaService.shop.findUnique({
      where: { id },
      include: {
        image: true,
        products: true,
      },
    });

    if (!shop) {
      throw new NotFoundException('Shop Not Found');
    }
    return shop;
  }

  async findShopByShopCode(shopCode: string): Promise<Shop | null> {
    return this.prismaService.shop.findFirst({
      where: { shopCode },
      include: {
        image: true,
        products: true,
      },
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
    return await this.prismaService.shop.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        image: true,
        products: true,
      },
    });
  }

  async createShop(data: Prisma.ShopCreateInput) {
    return this.prismaService.shop.create({ data });
  }

  async updateShop(shopId: string, data: any) {
    const shop = await this.shop(shopId);
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    return this.prismaService.shop.update({ where: { id: shopId }, data });
  }

  async deleteShop(id: string) {
    return this.prismaService.shop.delete({ where: { id } });
  }
}
