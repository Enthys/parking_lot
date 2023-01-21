import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import VehicleCategory from './entity/vehicle-category.entity';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import Vehicle from './entity/vehicle.entity';
import VehicleCategoryRepository from './repository/vehicle-category.repository';
import VehicleTypeCategoryRepository from './repository/vehicle-type-category.repository';
import VehicleRepository from './repository/vehicle.repository';
import VehicleCategoryService from './vehicle-category.service';
import VehicleTypeCategoryService from './vehicle-type-category.service';
import VehicleService from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, VehicleCategory, VehicleTypeCategory]),
  ],
  providers: [
    VehicleService,
    VehicleCategoryService,
    VehicleTypeCategoryService,

    VehicleRepository,
    VehicleCategoryRepository,
    VehicleTypeCategoryRepository,
  ],
  exports: [VehicleService, VehicleCategoryService, VehicleTypeCategoryService],
})
export default class VehicleModule {}
