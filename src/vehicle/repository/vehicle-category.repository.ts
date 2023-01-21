import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import VehicleCategory from '../entity/vehicle-category.entity';

@Injectable()
export default class VehicleCategoryRepository {
  constructor(
    @InjectRepository(VehicleCategory)
    private readonly repository: Repository<VehicleCategory>,
  ) {}

  public get(category: string) {
    return this.repository.findOne({ where: { category } });
  }
}
