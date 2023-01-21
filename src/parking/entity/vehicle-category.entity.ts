import { Column, Entity, PrimaryColumn } from 'typeorm';
import VehicleCategoryIdentifier from '../enum/vehicle-category-identifier.enum';

@Entity({ name: 'vehicle_categories' })
export default class VehicleCategory {
  @PrimaryColumn({
    type: 'enum',
    enumName: 'vehicle_category',
  })
  public category: VehicleCategoryIdentifier;

  @Column()
  public spaces: number;
}
