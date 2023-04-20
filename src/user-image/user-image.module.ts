import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImage } from 'src/entities/userImage.entity';
import { UserImageService } from './user-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage])],
  providers: [UserImageService],
  exports: [UserImageService],
})
export class UserImageModule {}
