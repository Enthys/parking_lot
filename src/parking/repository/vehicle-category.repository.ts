import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import VehicleCategory from '../entity/vehicle-category.entity';
import VehicleCategoryIdentifier from '../enum/vehicle-category-identifier.enum';

@Injectable()
export default class VehicleCategoryRepository {
  constructor(
    @InjectRepository(VehicleCategory)
    private readonly repository: Repository<VehicleCategory>,
  ) {}

  public get(category: VehicleCategoryIdentifier) {
    return this.repository.findOne({ where: { category } });
  }
}
