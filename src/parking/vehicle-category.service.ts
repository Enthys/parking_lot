import { Injectable } from '@nestjs/common';
import VehicleCategory from './entity/vehicle-category.entity';
import VehicleCategoryIdentifier from './enum/vehicle-category-identifier.enum';
import UnkownCategoryError from './error/unknown-category.error';
import VehicleCategoryRepository from './repository/vehicle-category.repository';

@Injectable()
export default class VehicleCategoryService {
  constructor(private readonly categoryRepository: VehicleCategoryRepository) {}

  public async getCategory(
    identifier: VehicleCategoryIdentifier,
  ): Promise<VehicleCategory> {
    const category = await this.categoryRepository.get(identifier);
    if (!category) {
      throw new UnkownCategoryError(identifier);
    }

    return category;
  }
}
