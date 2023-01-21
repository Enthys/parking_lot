import { BadRequestException } from '@nestjs/common';

export default class NotEnoughParkingSpacesError extends BadRequestException {
  constructor() {
    super('Not enough spaces in parking lot');
  }
}
