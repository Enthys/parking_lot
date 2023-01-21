import { Injectable } from '@nestjs/common';
import VehicleCategory from './entity/vehicle-category.entity';
import Vehicle from './entity/vehicle.entity';
import MissingCategoryHourlyRatesError from './error/missing-category-hourly-rates.error';
import HourlyRateRepository from './repository/hourly-rate.repository';

@Injectable()
export default class HourlyRateService {
  constructor(private readonly hourlyRateRepository: HourlyRateRepository) {}

  public async getVehicleBill(vehicle: Vehicle): Promise<number> {
    return this.getBillForCategory(vehicle.category, vehicle.enter, new Date());
  }

  private async getBillForCategory(
    category: VehicleCategory,
    start: Date,
    end: Date,
  ): Promise<number> {
    const rates = await this.hourlyRateRepository.getForCategory(category);

    if (rates.length === 0) {
      throw new MissingCategoryHourlyRatesError(category.category);
    }

    const time = new Date(start);

    let total = 0;
    do {
      const hour = time.getHours();

      const priceForHour = rates.find((rate) => {
        return rate.start <= hour && hour < rate.end;
      }).price;

      total += priceForHour;
      time.setHours(time.getHours() + 1);
    } while (time < end);

    return total;
  }
}
