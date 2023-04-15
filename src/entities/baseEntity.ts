import { createId } from '@paralleldrive/cuid2';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryColumn()
  id: string = createId();

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
