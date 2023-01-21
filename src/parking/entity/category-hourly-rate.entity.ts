import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VehicleCategory from './vehicle-category.entity';

@Entity({ name: 'category_hourly_rates' })
export default class CategoryHourlyRate {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => VehicleCategory)
  @JoinColumn({ name: 'category', referencedColumnName: 'category' })
  public category: VehicleCategory;

  @Column()
  public start: number;

  @Column()
  public end: number;

  @Column()
  public price: number;
}
