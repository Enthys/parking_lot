import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Discount from '../../discount/entity/discount.entity';
import Vehicle from '../../vehicle/entity/vehicle.entity';

@Entity({ name: 'vehicle_discounts' })
export default class VehicleDiscount {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Vehicle, { eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  public vehicle: Vehicle;

  @OneToOne(() => Discount, { eager: true })
  @JoinColumn({ name: 'discount_id' })
  public discount: Discount;
}
