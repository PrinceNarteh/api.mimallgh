import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../utils/baseEntity';
import { Shop } from '../shop/shop.entity';

export enum CategoryType {
  FOOD = 'food',
  FASHION_AND_WEARS = 'fashion_and_wears',
  GROCERY_AND_GENERAL = 'grocery_and_general',
  HEALTH_AND_WELLNESS = 'health_and_wellness',
  HOME_AND_ELECTRICAL_APPLIANCES = 'home_and_electrical_appliances',
  PERSONAL_SERVICES = 'personal_services',
  PRINTING_AND_STATIONERY = 'printing_and_stationery',
  TECH = 'tech',
}

@Entity('products')
export class Product extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: 0,
    type: 'numeric',
  })
  price: number;

  @Column({
    default: 0,
    type: 'numeric',
  })
  discountPercentage: number;

  @Column({
    default: 0,
  })
  stock: number;

  @Column()
  brand: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  category: string;

  @Column({
    type: 'array',
  })
  rating: number[];

  @Column({
    type: 'simple-array',
  })
  images: Array<{
    public_id: string;
    secure_url: String;
  }>;

  @ManyToOne(() => Shop, (shop) => shop.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: '' })
  shopId: Shop;
}