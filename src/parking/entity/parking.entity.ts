import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ParkingConfigName {
  Space = 'space',
}

@Entity()
export default class ParkingConfig {
  @PrimaryColumn({ enum: ParkingConfig })
  public readonly name: ParkingConfigName;

  @Column({ type: 'varchar', length: 64 })
  public space: string;
}
