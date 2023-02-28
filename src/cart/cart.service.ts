import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Users } from 'src/user/entities/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private productService: ProductService,
  ) {}

  async addToCart(
    productId: number,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productService.getOne(productId);
    const authUser = await this.userRepository.findOne({
      where: {
        username: user,
      },
    });

    if (product) {
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.username === user,
      );

      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.item = product;

        return await this.cartRepository.save(newItem);
      } else {
        const total = product.price * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }

  async getItemsInCard(user: string): Promise<Cart[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return await userCart.filter((item) => item.user.username === user);
  }
}
