import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ShopRefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { CreateShopDto } from 'src/shop/dto/shopDto';
import { ShopLocalGuard } from './guards/local-auth.guard';
import { ShopAuthService } from './shop-auth.service';
import { ShopService } from 'src/shop/shop.service';

@Controller('shop-auth')
export class ShopAuthController {
  constructor(
    private shopAuthService: ShopAuthService,
    private shopService: ShopService,
  ) {}

  @UseGuards(ShopLocalGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.shopAuthService.login(req.shop);
  }

  @Post('register')
  async register(@Request() req, @Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShop(req.shop, createShopDto);
  }

  @UseGuards(ShopRefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.shopAuthService.refreshToken(req.shop);
  }
}
