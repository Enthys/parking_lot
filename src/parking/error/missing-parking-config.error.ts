import { ParkingConfigName } from '../entity/parking.entity';

export default class MissingParkingConfigError extends Error {
  constructor(config: ParkingConfigName) {
    super();

    this.message = `Configuration '${config}' does not exist`;
  }
}
