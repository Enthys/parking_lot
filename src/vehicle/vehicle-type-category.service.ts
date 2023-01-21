import { Injectable } from '@nestjs/common';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import UnknownVehicleTypeError from '../error/unknown-vehicle-type.error';
import VehicleTypeCategoryRepository from './repository/vehicle-type-category.repository';

@Injectable()
export default class VehicleTypeCategoryService {
  constructor(
    private readonly typeCategoryRepository: VehicleTypeCategoryRepository,
  ) {}

  /**
   * getTypeCategory attempts to retrieve the given vehicle type category by the
   * provided type.
   *
   * If no category is found then a `UnknownVehicleTypeError` will be thrown.
   *
   * @param type
   * @throws {UnknownVehicleTypeError}
   */
  public async getTypeCategory(type: string): Promise<VehicleTypeCategory> {
    const typeCategory = await this.typeCategoryRepository.get(type);
    if (!typeCategory) {
      throw new UnknownVehicleTypeError(type);
    }

    return typeCategory;
  }
}
