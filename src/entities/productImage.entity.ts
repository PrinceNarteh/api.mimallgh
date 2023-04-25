import { Entity, ManyToOne } from 'typeorm';
import { BaseImage } from './base/baseImageEntity';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage extends BaseImage {
  @ManyToOne(() => Product, (product) => product.images)
  image: Product;
}
