import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(id: string) {
    return 'User with ID ' + id;
  }
}
