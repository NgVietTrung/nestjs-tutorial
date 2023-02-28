import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async getOne(productId: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
  }

  async getFeaturingProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        isFeaturing: true,
      },
    });
  }

  async update(id: number, product: Product): Promise<UpdateResult> {
    return await this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
