import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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
  @IsOptional()
  address: string;

  @IsNumberString()
  phoneNumber: string;

  @IsNumberString()
  @IsOptional()
  alternateNumber: string;

  @IsNumberString()
  @IsOptional()
  whatsappNumber: string;

  @IsString()
  @IsOptional()
  instagramHandle: string;

  @IsString()
  @IsOptional()
  facebookHandle: string;

  @IsString()
  openingTime: string;

  @IsString()
  closingTime: string;
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
