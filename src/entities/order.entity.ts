import { Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './OrderItem.entity';

export class Order {
  @ManyToOne(() => User, (user) => user.orders)
  userId: User;

  @Column()
  amount: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}
