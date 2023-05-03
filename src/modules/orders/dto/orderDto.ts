import { IsPositive, IsString, ValidateNested } from 'class-validator';

// export class OrderItem extends Base {
//   @Column()
//   productId: string;

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

  @IsString()
  shopId: string;
}

export class CreateOrderDto {
  @IsPositive()
  amount: number;

  @ValidateNested()
  items: CreateOrderItemDto[];
}
