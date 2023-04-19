import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base/baseEntity';
import { Product } from './product.entity';
import { ShopImage } from './shopImage.entity';
import { User } from './user.entity';

@Entity('shops')
export class Shop extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  alternateNumber: string;

  @Column({ nullable: true })
  whatsappNumber: string;

  @Column({ nullable: true })
  instagramHandle: string;

  @Column({ nullable: true })
  facebookHandle: string;

  @Column()
  openingTime: string;

  @Column()
  closingTime: string;

  @Column()
  sellerId: string;

  @OneToOne(() => User, (user) => user.shop)
  @JoinColumn()
  owner: User;

  @OneToOne(() => ShopImage, (shopImage) => shopImage.shopId)
  image: ShopImage;

  @OneToMany(() => Product, (product) => product.shopId)
  products: Product[];

  // branches        Branch[]
}
