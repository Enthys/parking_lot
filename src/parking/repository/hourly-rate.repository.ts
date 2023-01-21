import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryHourlyRate from '../entity/category-hourly-rate.entity';
import VehicleCategory from '../entity/vehicle-category.entity';

@Injectable()
export default class HourlyRateRepository {
  constructor(
    @InjectRepository(CategoryHourlyRate)
    private readonly repository: Repository<CategoryHourlyRate>,
  ) {}

  public getForCategory(
    category: VehicleCategory,
  ): Promise<CategoryHourlyRate[]> {
    return this.repository.find({
      where: { category: category.category } as any,
    });
  }
}
