import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { join } from 'path';
import { Product } from 'src/entities/product.entity';
import { ProductImage } from 'src/entities/productImage.entity';
import { Shop } from 'src/entities/shop.entity';
import { ShopImage } from 'src/entities/shopImage.entity';
import { User } from 'src/entities/user.entity';
import { UserImage } from 'src/entities/userImage.entity';

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  username: 'root',
  password: 'root',
  database: 'mimallgh',
  host: 'localhost',
  port: 3306,
  entities: [Product, ProductImage, Shop, ShopImage, User, UserImage],
  synchronize: true,
};
