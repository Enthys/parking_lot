import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryHourlyRate from './entity/category-hourly-rate.entity';
import ParkingConfig, { ParkingConfigName } from './entity/parking.entity';
import VehicleCategory from './entity/vehicle-category.entity';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import Vehicle from './entity/vehicle.entity';
import HourlyRateService from './hourly-rate.service';
import ParkingController from './parking.controller';
import ParkingConfigService from './parking.service';
import HourlyRateRepository from './repository/hourly-rate.repository';
import ParkingConfigRepository from './repository/parking.repository';
import VehicleCategoryRepository from './repository/vehicle-category.repository';
import VehicleTypeCategoryRepository from './repository/vehicle-type-category.repository';
import VehicleRepository from './repository/vehicle.repository';
import VehicleCategoryService from './vehicle-category.service';
import VehicleTypeCategoryService from './vehicle-type-category.service';
import VehicleController from './vehicle.controller';
import VehicleService from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkingConfig,
      Vehicle,
      VehicleCategory,
      VehicleTypeCategory,
      CategoryHourlyRate,
    ]),
  ],
  providers: [
    ParkingConfigService,
    VehicleService,
    VehicleCategoryService,
    VehicleTypeCategoryService,
    HourlyRateService,

    ParkingConfigRepository,
    VehicleRepository,
    VehicleCategoryRepository,
    VehicleTypeCategoryRepository,
    HourlyRateRepository,
  ],
  controllers: [ParkingController, VehicleController],
})
export default class ParkingModule {}
