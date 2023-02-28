import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Users } from 'src/user/entities/user.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductService } from 'src/product/product.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Cart, Users])],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
})
export class OrderModule {}
