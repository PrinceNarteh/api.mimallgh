import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductImage } from 'src/entities/productImage.entity';
import { Shop } from 'src/entities/shop.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Shop ID is required' })
  shopId: Shop;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Phone number is required' })
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

  @ValidateNested()
  @Type(() => ProductImage)
  images: ProductImage[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
