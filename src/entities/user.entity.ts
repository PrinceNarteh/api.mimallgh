import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { Base } from './base/baseEntity';
import bcrypt from 'bcrypt';
import { UserImage } from './userImage.entity';
import { Shop } from './shop.entity';

enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
}

enum LevelType {
  LEVEL_ONE = 'level_one',
  LEVEL_TWO = 'level_two',
  LEVEL_THREE = 'level_three',
  SUPER_USER = 'super_user',
}

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

  @Column()
  nationality: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserImage, (userImage) => userImage.avatar)
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
    enum: RoleType,
    default: RoleType.USER,
  })
  role: string;

  @Column({
    type: 'enum',
    enum: LevelType,
    default: LevelType.LEVEL_ONE,
  })
  level: string;

  @OneToOne(() => Shop, (shop) => shop.owner)
  shop: Shop;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
