import { Order as OrderModel } from '@prisma/client';

export class Order implements OrderModel {
  id: string;
  amount: number;
  orderId: string;
  userId: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    shopName: string;
    shopId: string;
  }[];
}
