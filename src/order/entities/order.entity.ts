import { Users } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => Product, (item) => item.id)
  items: Product[];

  @OneToOne(() => Users, (user) => user.username)
  @JoinColumn()
  user: Users;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
