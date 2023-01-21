import { Injectable } from '@nestjs/common';
import DiscountService from '../discount/discount.service';
import VehicleCategory from '../vehicle/entity/vehicle-category.entity';
import Vehicle from '../vehicle/entity/vehicle.entity';
import MissingCategoryHourlyRatesError from '../error/missing-category-hourly-rates.error';
import HourlyRateRepository from './repository/hourly-rate.repository';
import VehicleCategoryService from '../vehicle/vehicle-category.service';
import VehicleDiscountService from './vehicle-discount.service';

@Injectable()
export default class HourlyRateService {
  constructor(
    private readonly hourlyRateRepository: HourlyRateRepository,
    private readonly discountService: DiscountService,
    private readonly vehicleCategoryService: VehicleCategoryService,
    private readonly vehicleDiscountService: VehicleDiscountService,
  ) {}

  /**
   * getVehicleBill calculates the amount that the vehicle has to pay in the
   * current moment. It calculates the total by taking the hourly rates for the
   * type of vehicle and for every hour between the vehicle entering the parking
   * lot, and now it adds the appropriate rate. When the total is summed up it
   * retrieves any discount that the vehicle is using and applies it to the
   * calculated total.
   *
   * @param vehicle
   */
  public async getVehicleBill(vehicle: Vehicle): Promise<number> {
    const vehicleCategory = await this.vehicleCategoryService.getCategory(
      vehicle.category.category,
    );

    const bill = await this.getBillForCategory(
      vehicleCategory,
      vehicle.enter,
      new Date(),
    );

    const discount =
      await this.vehicleDiscountService.getVehicleDiscountPercent(vehicle);

    if (discount === 0) {
      return bill;
    }

    return bill - bill * (discount / 100);
  }

  /**
   * getBillForCategory retrieves the rates for the provided vehicle category
   * and using those rates calculates the total for a given period of time.
   *
   * If it does not find any hourly rates for the provided category it throws a
   * `MissingCategoryHourlyRatesError`.
   *
   * @param category
   * @param start
   * @param end
   * @private
   */
  private async getBillForCategory(
    category: VehicleCategory,
    start: Date,
    end: Date,
  ): Promise<number> {
    const rates = await this.hourlyRateRepository.getForCategory(category);

    // Check if category has rates
    if (rates.length === 0) {
      throw new MissingCategoryHourlyRatesError(category.category);
    }

    const time = new Date(start);

    let total = 0;
    do {
      const hour = time.getHours();

      const priceForHour = rates.find((rate) => {
        return rate.start <= hour && hour < rate.end;
      });

      // if there is no price for given range do not add rate
      if (priceForHour) {
        total += priceForHour.price;
      }

      time.setHours(time.getHours() + 1);
    } while (time < end);

    return total;
  }
}
