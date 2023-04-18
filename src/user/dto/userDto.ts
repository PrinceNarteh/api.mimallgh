import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumberString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UserImage } from 'src/entities/userImage.entity';
import { OneToOne } from 'typeorm';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumberString()
  phoneNumber: string;

  @IsNumberString()
  @IsOptional()
  alternateNumber: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  cardType?: string;

  @IsString()
  @IsOptional()
  cardNumber?: string;

  @IsBoolean({})
  @IsOptional()
  active: boolean;

  @IsOptional()
  @OneToOne(() => UserImage, (userImage) => userImage.avatar)
  image?: UserImage;

  //     role            Role
  //     level           Level?
  //     createdAt       DateTime  @default(now())
  //     updatedAt       DateTime  @updatedAt
  //     shop            Shop?
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
