import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Discount from '../../discount/entity/discount.entity';
import VehicleDiscount from '../entity/vehicle-discount.entity';
import Vehicle from '../../vehicle/entity/vehicle.entity';

@Injectable()
export default class VehicleDiscountRepository {
  constructor(
    @InjectRepository(VehicleDiscount)
    private readonly repository: Repository<VehicleDiscount>,
  ) {}

  public getVehicleDiscount(vehicle: Vehicle): Promise<VehicleDiscount> {
    return this.repository.findOne({ where: { vehicle: { id: vehicle.id } } });
  }

  createDiscount(
    vehicle: Vehicle,
    discount: Discount,
  ): Promise<VehicleDiscount> {
    return this.repository.save(
      this.repository.create({
        vehicle,
        discount,
      }),
    );
  }
}
