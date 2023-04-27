// export class OrderItem extends Base {
//   @Column()
//   productId: string;

import { IsPositive, IsString, ValidateNested } from 'class-validator';

//   @Column()
//   name: string;

//   @Column()
//   quantity: number;

//   @Column()
//   price: number;

//   @Column()
//   shopName: string;

//   @ManyToOne(() => Order, (order) => order.items)
//   order: Order;
// }

class CreateOrderItemDto {
  @IsString()
  name: string;

  @IsPositive()
  quantity: number;

  @IsPositive()
  price: number;

  @IsString()
  shopName: string;
}

export class CreateOrderDto {
  @IsPositive()
  amount: number;

  @ValidateNested()
  items: CreateOrderItemDto[];
}
