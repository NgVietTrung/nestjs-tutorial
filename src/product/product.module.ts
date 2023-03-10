import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
