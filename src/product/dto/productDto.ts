import { PartialType } from '@nestjs/swagger';
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
import { Shop } from 'src/entities/shop.entity';
import { Column } from 'typeorm';

class Image {
  @IsString()
  @IsNotEmpty({ message: 'public_id is required' })
  public_id: string;

  @IsString()
  @IsNotEmpty({ message: 'secure_url is required' })
  secure_url: string;
}

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

  // @ValidateNested({ always: true })
  @Column({ type: 'array' })
  images: Image[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
