import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import VehicleCategory from './vehicle-category.entity';

@Entity({ name: 'vehicle_type_categories' })
export default class VehicleTypeCategory {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  public type: string;

  @JoinColumn({ name: 'category' })
  @ManyToOne(() => VehicleCategory, { eager: true })
  public category: VehicleCategory;
}
