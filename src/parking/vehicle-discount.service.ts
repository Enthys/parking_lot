import { Injectable } from '@nestjs/common';
import Discount from '../discount/entity/discount.entity';
import VehicleDiscount from './entity/vehicle-discount.entity';
import Vehicle from '../vehicle/entity/vehicle.entity';
import VehicleDiscountRepository from './repository/vehicle-discount.repository';

@Injectable()
export default class VehicleDiscountService {
  constructor(
    private readonly vehicleDiscountRepository: VehicleDiscountRepository,
  ) {}

  public async setDiscount(
    vehicle: Vehicle,
    discount: Discount,
  ): Promise<VehicleDiscount> {
    return this.vehicleDiscountRepository.createDiscount(vehicle, discount);
  }

  /**
   * getVehicleDiscountPercent returns the amount of percent that the parked has
   * off of its final bill. If the car is not using a discount it will return 0
   *
   * @param {Vehicle} vehicle
   */
  public async getVehicleDiscountPercent(vehicle: Vehicle): Promise<number> {
    const discount = await this.vehicleDiscountRepository.getVehicleDiscount(
      vehicle,
    );

    if (!discount) {
      return 0;
    }

    return discount.discount.type.discount;
  }
}
