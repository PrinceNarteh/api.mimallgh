import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { Base } from './base/baseEntity';
import { User } from './user.entity';

@Entity()
export class Order extends Base {
  @ManyToOne(() => User, (user) => user.orders)
  userId: User;

  @Column()
  amount: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  @BeforeInsert()
  async calcAmount() {
    this.amount = this.items.reduce(
      (amt, currentItem) => amt + currentItem.price * currentItem.quantity,
      0,
    );
  }
}
