import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import VehicleTypeCategory from '../entity/vehicle-type-category.entity';

@Injectable()
export default class VehicleTypeCategoryRepository {
  constructor(
    @InjectRepository(VehicleTypeCategory)
    private readonly repository: Repository<VehicleTypeCategory>,
  ) {}

  public get(type: string): Promise<VehicleTypeCategory> {
    return this.repository.findOne({ where: { type } });
  }
}
