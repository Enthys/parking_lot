import { Injectable } from '@nestjs/common';
import ParkingConfigRepository from './repository/parking.repository';

@Injectable()
export default class ParkingConfigService {
  constructor(private readonly parkingRepository: ParkingConfigRepository) {}
}
