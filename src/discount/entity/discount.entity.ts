import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import DiscountType from './discount-type.entity';

@Entity({ name: 'discounts' })
export default class Discount {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => DiscountType, { eager: true })
  @JoinColumn({ name: 'type' })
  public type: DiscountType;
}
