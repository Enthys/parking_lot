import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DiscountModule from '../discount/discount.module';
import VehicleModule from '../vehicle/vehicle.module';
import CategoryHourlyRate from './entity/category-hourly-rate.entity';
import ParkingConfig from './entity/parking.entity';
import VehicleDiscount from './entity/vehicle-discount.entity';
import HourlyRateService from './hourly-rate.service';
import ParkingController from './parking.controller';
import ParkingService from './parking.service';
import HourlyRateRepository from './repository/hourly-rate.repository';
import ParkingConfigRepository from './repository/parking.repository';
import VehicleDiscountRepository from './repository/vehicle-discount.repository';
import VehicleDiscountService from './vehicle-discount.service';

@Module({
  imports: [
    VehicleModule,
    DiscountModule,
    TypeOrmModule.forFeature([
      ParkingConfig,
      CategoryHourlyRate,
      VehicleDiscount,
    ]),
  ],
  providers: [
    ParkingService,
    HourlyRateService,
    VehicleDiscountService,

    ParkingConfigRepository,
    HourlyRateRepository,
    VehicleDiscountRepository,
  ],
  controllers: [ParkingController],
})
export default class ParkingModule {}
