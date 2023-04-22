import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly shopService: ShopService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhoneNumber: string, password: string) {
    const user = await this.shopService.findShopByShopCode(emailOrPhoneNumber);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    let payload: object;

    if (user.role === 'seller') {
      payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        shopId: user.shopId,
      };
    } else {
      payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    let payload: object;

    if (user.role === 'seller') {
      payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        shopId: user.shopId,
      };
    } else {
      payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
