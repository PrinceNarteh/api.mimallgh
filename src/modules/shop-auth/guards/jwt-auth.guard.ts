import { Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ShopJwtGuard extends AuthGuard('jwt-shop') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    console.log(info);
    if (err || !user) {
      throw new HttpException(err.message, err.status);
    }
    return user;
  }
}
