import {
  IsString,
  IsNumberString,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName?: string;

  @IsString()
  address?: string;

  @IsNumberString()
  phoneNumber: string;

  @IsNumberString()
  alternateNumber: string;

  @IsString()
  nationality: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  image?: string;

  @IsString()
  cardType?: string;

  @IsString()
  cardNumber?: string;

  @IsBoolean()
  active: boolean;

  //     role            Role
  //     level           Level?
  //     createdAt       DateTime  @default(now())
  //     updatedAt       DateTime  @updatedAt
  //     shop            Shop?
}

// model User {
//     id              String    @id @default(cuid())
//     firstName       String
//     lastName        String
//     middleName      String?
//     address         String?
//     phoneNumber     String
//     alternateNumber String?
//     nationality     String
//     email           String    @unique
//     password        String
//     image           String?
//     cardType        String?
//     cardNumber      String?
//     active          Boolean   @default(true)
//     role            Role
//     level           Level?
//     accounts        Account[]
//     sessions        Session[]
//     createdAt       DateTime  @default(now())
//     updatedAt       DateTime  @updatedAt
//     shop            Shop?
// }
