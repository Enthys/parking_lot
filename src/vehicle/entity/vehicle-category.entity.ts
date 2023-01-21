import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vehicle_categories' })
export default class VehicleCategory {
  @PrimaryColumn({
    type: 'varchar',
    length: '64',
    unique: true,
  })
  public category: string;

  @Column()
  public spaces: number;
}
