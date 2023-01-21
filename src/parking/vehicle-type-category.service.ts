import { Injectable } from '@nestjs/common';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import VehicleType from './enum/vehicle-type.enum';
import UnknownVehicleTypeError from './error/unknown-vehicle-type.error';
import VehicleTypeCategoryRepository from './repository/vehicle-type-category.repository';

@Injectable()
export default class VehicleTypeCategoryService {
  constructor(
    private readonly typeCategoryRepository: VehicleTypeCategoryRepository,
  ) {}

  public async getTypeCategory(
    type: VehicleType,
  ): Promise<VehicleTypeCategory> {
    const typeCategory = await this.typeCategoryRepository.get(type);
    if (!typeCategory) {
      throw new UnknownVehicleTypeError(type);
    }

    return typeCategory;
  }
}
