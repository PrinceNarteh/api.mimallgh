import { OmitType } from '@nestjs/swagger';
import { IsPositive, IsString, ValidateNested } from 'class-validator';
import { Order } from 'src/entities/order.entity';

// class CreateOrderItemDto {
//   @IsString()
//   name: string;

//   @IsPositive()
//   quantity: number;

//   @IsPositive()
//   price: number;

//   @IsString()
//   shopName: string;

//   @IsString()
//   shopId: string;
// }

export class CreateOrderDto extends OmitType(Order, ['id']) {}
