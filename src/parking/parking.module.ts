import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ParkingConfig from './entity/parking.entity';
import ParkingController from './parking.controller';
import ParkingConfigService from './parking.service';
import ParkingConfigRepository from './repository/parking.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingConfig])],
  providers: [ParkingConfigService, ParkingConfigRepository],
  controllers: [ParkingController],
})
export default class ParkingModule {}
