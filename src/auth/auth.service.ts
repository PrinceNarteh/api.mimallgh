import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Shop } from 'src/entities/shop.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhoneNumber: string, password: string) {
    const user = await this.userService.findOneByEmailOrPhoneNumber(
      emailOrPhoneNumber,
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(shop: Shop) {
    let payload = {
      id: shop.id,
      name: shop.name,
      shopCode: shop.shopCode,
    };

    return {
      ...shop,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(shop: Shop) {
    let payload = {
      id: shop.id,
      name: shop.name,
      shopCode: shop.shopCode,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
