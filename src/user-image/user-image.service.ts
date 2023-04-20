import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImage } from 'src/entities/userImage.entity';
import { Repository } from 'typeorm';
import { CreateUserImageDto } from './dto/userImageDto';

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImage)
    private readonly imageRepository: Repository<UserImage>,
  ) {}

  async create(data: CreateUserImageDto) {
    const image = this.imageRepository.create(data);
    await this.imageRepository.save(image);
    return image;
  }

  async delete(id: string) {
    return await this.imageRepository.delete(id);
  }
}
