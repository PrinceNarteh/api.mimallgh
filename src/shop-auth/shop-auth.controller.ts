import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateShopDto } from 'src/shop/dto/shopDto';
import { ShopService } from 'src/shop/shop.service';
import { LocalShopAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { ShopAuthService } from './shop-auth.service';

@Controller('shop-auth')
export class ShopAuthController {
  constructor(
    private shopAuthService: ShopAuthService,
    private shopService: ShopService,
  ) {}

  @UseGuards(LocalShopAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.shopAuthService.login(req.user);
  }

  @Post('register')
  async registerShop(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShop(createShopDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.shopAuthService.refreshToken(req.user);
  }
}
