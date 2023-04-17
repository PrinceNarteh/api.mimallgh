import { PartialType } from '@nestjs/swagger';
import { Product } from '../../entities/product.entity';
import { IsEmail, IsNumberString, IsString, MinLength } from 'class-validator';

export class CreateShopDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  address: string;

  @IsNumberString()
  phoneNumber: string;

  @IsNumberString()
  alternateNumber: string;

  @IsNumberString()
  whatsappNumber: string;

  @IsString()
  instagramHandle: string;

  @IsString()
  facebookHandle: string;

  @IsString()
  openingTime: string;

  @IsString()
  closingTime: string;

  @IsString()
  sellerId: string;

  //   products: Product[];

  // branches        Branch[]
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
