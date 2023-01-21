import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum VehicleType {
  A = 'A',
  B = 'B',
  C = 'C',
}

@Entity()
export default class Vehicle {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ enum: VehicleType })
  public type: VehicleType;

  @Column({ type: 'varchar', length: 64 })
  @Index({ unique: true, where: 'exit IS NOT NULL' })
  public plateNumber: string;

  @Column({ type: 'timestamp', nullable: false, default: 'NOW()' })
  public enter: Date;

  @Column({ type: 'timestamp', nullable: true })
  public exit: Date;
}
