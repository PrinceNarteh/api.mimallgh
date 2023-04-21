import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ShopRefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { CreateShopDto } from 'src/shop/dto/shopDto';



@Controller('shop-auth')
export class ShopAuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createShopDto: CreateShopDto) {
    return await this.userService.create(createShopDto);
  }

  @UseGuards(ShopRefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
