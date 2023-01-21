import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import VehicleCategoryIdentifier from '../enum/vehicle-category-identifier.enum';
import CategoryHourlyRate from './category-hourly-rate.entity';

@Entity({ name: 'vehicle_categories' })
export default class VehicleCategory {
  @PrimaryColumn({
    type: 'enum',
    enumName: 'vehicle_category',
  })
  public category: VehicleCategoryIdentifier;

  @Column()
  public spaces: number;

  @OneToMany(() => CategoryHourlyRate, (rate) => rate.category)
  public prices: CategoryHourlyRate[];
}
