import { Product } from 'src/entities/product.entity';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  username: 'root',
  password: 'root',
  database: 'mimallgh',
  host: 'localhost',
  port: 3306,
  entities: [Product, Shop, User],
  synchronize: true,
};
