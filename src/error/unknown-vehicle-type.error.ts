import { BadRequestException } from '@nestjs/common';

export default class UnknownVehicleTypeError extends BadRequestException {
  constructor(type: string) {
    super(`Unknown vehicle type '${type}'`);
  }
}
