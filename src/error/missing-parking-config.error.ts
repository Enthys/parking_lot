import { InternalServerErrorException } from '@nestjs/common';
import { ParkingConfigName } from '../parking/entity/parking.entity';

export default class MissingParkingConfigError extends InternalServerErrorException {
  constructor(config: ParkingConfigName) {
    super(`Configuration '${config}' does not exist`);
  }
}
