import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum ParkingConfigName {
  Space = 'space',
}

@Entity()
export default class ParkingConfig {
  @PrimaryColumn({ type: 'enum', enum: ParkingConfig })
  public config: ParkingConfigName;

  @Column({ type: 'varchar', length: 64 })
  public value: string;
}
