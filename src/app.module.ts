import { Product } from './product/entities/product.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { Users } from './user/entities/user.entity';
import { Cart } from './cart/entities/cart.entity';
import { Order } from './order/entities/order.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'viettrung00',
      database: 'candileaf',
      entities: [Product, Users, Cart, Order],
      synchronize: true,
    }),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
