import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseImage } from './base/baseImageEntity';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage extends BaseImage {
  @ManyToOne(() => ProductImage, (product) => product.images)
  @JoinColumn()
  images: Product;
}
