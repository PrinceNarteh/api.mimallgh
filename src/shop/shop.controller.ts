import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto, UpdateShopDto } from './dto/shopDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async allShop() {
    return this.shopService.shops({
      relations: {
        products: true,
      },
    });
  }

  @Get(':shopId')
  async getShop(@Param('shopId') shopId: string) {
    return this.shopService.shop(shopId);
  }

  @Post()
  async createShop(@Body() data: CreateShopDto) {
    return this.shopService.createShop(data);
  }

  @Patch(':shopId')
  async updateShop(
    @Param('shopId') shopId: string,
    @Body() data: UpdateShopDto,
  ) {
    return this.shopService.updateShop(shopId, data);
  }

  @Delete(':shopId')
  async deleteShop(@Param('shopId') shopId: string) {
    return this.shopService.deleteShop(shopId);
  }
}
