import { IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserImageDto {
  @IsString()
  public_id: string;

  @IsString()
  secure_url: string;

  @IsString()
  userId: User;
}
