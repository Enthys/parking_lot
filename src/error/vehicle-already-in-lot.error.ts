import { ConflictException } from '@nestjs/common';

export default class VehicleAlreadyInLotError extends ConflictException {
  constructor(plateNumber: string) {
    super(`Vehicle '${plateNumber}' is already in the parking lot`);
  }
}
