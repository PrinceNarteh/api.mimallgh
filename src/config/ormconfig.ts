import { Product } from 'src/product/product.entity';
import { Shop } from 'src/shop/shop.entity';
import { User } from 'src/user/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'mimallgh',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  entities: [Product, Shop, User],
  synchronize: true,
};
