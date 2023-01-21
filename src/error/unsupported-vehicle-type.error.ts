import { BadRequestException } from '@nestjs/common';

export default class UnsupportedVehicleTypeError extends BadRequestException {
  constructor(type: string) {
    super(`Cannot categorize vehicles of type '${type}'`);
  }
}
