import { Product } from './../../product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from 'src/user/entities/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: 0, type: 'int' })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  total: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  item: Product;

  @ManyToOne(() => Users, (user) => user.username)
  @JoinColumn()
  user: Users;
}
