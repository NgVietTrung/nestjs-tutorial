import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this.productService.getOne(id);
  }

  @Get('')
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get('/featuring/all')
  async getFeaturingProducts(): Promise<Product[]> {
    return await this.productService.getFeaturingProducts();
  }

  @Post()
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }
}
