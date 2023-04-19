import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImage } from 'src/entities/userImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImage)
    private readonly imageRepository: Repository<UserImage>,
  ) {}

  async create() {
    return 
  }
}
