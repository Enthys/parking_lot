import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ParkingConfig, { ParkingConfigName } from './entity/parking.entity';
import VehicleCategory from './entity/vehicle-category.entity';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import Vehicle from './entity/vehicle.entity';
import ParkingController from './parking.controller';
import ParkingConfigService from './parking.service';
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
    ]),
  ],
  providers: [
    ParkingConfigService,
    VehicleService,
    VehicleCategoryService,
    VehicleTypeCategoryService,

    ParkingConfigRepository,
    VehicleRepository,
    VehicleCategoryRepository,
    VehicleTypeCategoryRepository,
  ],
  controllers: [ParkingController, VehicleController],
})
export default class ParkingModule {}
