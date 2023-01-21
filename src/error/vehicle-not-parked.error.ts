import { NotFoundException } from '@nestjs/common';

export default class VehicleNotParkedError extends NotFoundException {
  constructor(plate: string) {
    super(`Vehicle '${plate}' in not in the parking lot.`);
  }
}
