import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'discount_types' })
export default class DiscountType {
  @PrimaryColumn({
    name: 'type',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  public type: string;

  @Column()
  public discount: number;
}
