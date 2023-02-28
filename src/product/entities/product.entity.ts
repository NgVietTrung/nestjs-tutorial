import { Cart } from 'src/cart/entities/cart.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  productName: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  quantity: number;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isFeaturing: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart[];
}
