import { Module } from '@nestjs/common';
import ParkingModule from './parking/parking.module';
import typeormProvider from './shared/providers/typeorm.provider';

@Module({
  imports: [typeormProvider, ParkingModule],
})
export default class AppModule {}
