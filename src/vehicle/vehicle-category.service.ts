import { Injectable } from '@nestjs/common';
import VehicleCategory from './entity/vehicle-category.entity';
import UnknownCategoryError from '../error/unknown-category.error';
import VehicleCategoryRepository from './repository/vehicle-category.repository';

@Injectable()
export default class VehicleCategoryService {
  constructor(private readonly categoryRepository: VehicleCategoryRepository) {}

  /**
   * getCategory attempts to retrieve to provided category by the given name.
   *
   * If no category is found a `UnknownCategoryError` will be thrown.
   *
   * @param name
   * @throws {UnknownCategoryError}
   */
  public async getCategory(name: string): Promise<VehicleCategory> {
    const category = await this.categoryRepository.get(name);
    if (!category) {
      throw new UnknownCategoryError(name);
    }

    return category;
  }
}
