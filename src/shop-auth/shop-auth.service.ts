import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Shop } from 'src/entities/shop.entity';


@Injectable()
export class ShopAuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(shop: Shop) {
    const payload = {
      username: shop.email,
      sub: {
        name: shop.name,
      },
    };

    return {
      ...shop,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(shop: Shop) {
    const payload = {
      username: shop.email,
      sub: {
        name: shop.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
