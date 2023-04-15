import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class Image {
  public_id: string;
  secure_url: string;
}

export class CreateProductDto {
  @IsString()
  shopId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discountPercentage: number;

  @IsNumber()
  stock: number;

  @IsString()
  brand: string;

  @IsEnum(
    [
      'food',
      'fashion_and_wears',
      'grocery_and_general',
      'health_and_wellness',
      'home_and_electrical_appliances',
      'personal_services',
      'printing_and_stationery',
      'tech',
    ],
    { always: true, each: true },
  )
  category: string;

  @Min(0, { each: true })
  @Max(5, { each: true })
  @IsInt()
  rating: number[];

  @ValidateNested({ each: true, always: true })
  images: Image[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export type IProductInput = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
};
