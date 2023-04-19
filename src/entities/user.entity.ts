import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { Base } from './base/baseEntity';
import bcrypt from 'bcrypt';
import { UserImage } from './userImage.entity';
import { Shop } from './shop.entity';

export type UserRoleType = 'admin' | 'user' | 'seller';

export type UserLevelType =
  | 'level_one'
  | 'level_two'
  | 'level_three'
  | 'super_user';

@Entity('users')
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  middleName: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column()
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  alternateNumber: string;

  @Column({
    nullable: true,
  })
  nationality: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserImage, (userImage) => userImage.userId)
  image: UserImage;

  @Column({
    nullable: true,
  })
  cardType: string;

  @Column({
    nullable: true,
  })
  cardNumber: string;

  @Column({
    default: true,
  })
  active: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'seller'],
    default: 'user',
  })
  role: string;

  @Column({
    type: 'enum',
    enum: ['level_one', 'level_two', 'level_three', 'super_user'],
    default: 'level_one',
    nullable: true,
  })
  level: string;

  @OneToOne(() => Shop, (shop) => shop.owner)
  shop: Shop;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
