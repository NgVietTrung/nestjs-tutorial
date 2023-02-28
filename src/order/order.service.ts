import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private cartService: CartService,
  ) {}

  async order(user: string): Promise<any> {
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter(
      (order) => order.user?.username === user && order.pending === false,
    );
    const cartItems = await this.cartService.getItemsInCard(user);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);
    const authUser = await this.userRepository.findOne({
      where: {
        username: user,
      },
    });
    const cart = await cartItems.map((item) => item.item);

    if (userOrder.length === 0) {
      const newOrder = await this.orderRepository.create({ subTotal });
      newOrder.items = cart;
      newOrder.user = authUser;
      return await this.orderRepository.save(newOrder);
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        subTotal: existingOrder[0].subTotal + cart[0].price,
      });
      return { message: 'order modified' };
    }
  }

  async getOrders(user: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user?.username === user);
  }
}
