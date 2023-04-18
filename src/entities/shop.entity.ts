import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base/baseEntity';
import { Product } from './product.entity';
import { ShopImage } from './shopImage.entity';

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

  @OneToOne(() => ShopImage, (shopImage) => shopImage.avatar)
  image: ShopImage;

  @OneToMany(() => Product, (product) => product.shopId)
  products: Product[];

  // branches        Branch[]
}
