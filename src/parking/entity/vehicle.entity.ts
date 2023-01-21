import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VehicleCategory from './vehicle-category.entity';

@Entity({ name: 'vehicles' })
export default class Vehicle {
  @PrimaryGeneratedColumn()
  public id: number;

  @JoinColumn({ name: 'category' })
  @ManyToOne(() => VehicleCategory, { eager: true })
  public category: VehicleCategory;

  @Column({ type: 'varchar', length: 64 })
  @Index({ unique: true, where: 'exit IS NOT NULL' })
  public plate: string;

  @Column({ type: 'timestamp', nullable: false, default: 'NOW()' })
  public enter: Date;

  @Column({ type: 'timestamp', nullable: true })
  public exit: Date;
}
