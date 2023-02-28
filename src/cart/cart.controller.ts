import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('api/v1/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async AddToCart(@Body() body, @Request() req): Promise<void> {
    const { productId, quantity } = body;
    return await this.cartService.addToCart(
      productId,
      quantity,
      req.user.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getItemsInCart(@Request() req): Promise<Cart[]> {
    return await this.cartService.getItemsInCard(req.user.username);
  }
}
