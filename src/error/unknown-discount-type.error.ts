import { BadRequestException } from '@nestjs/common';

export default class UnknownDiscountTypeError extends BadRequestException {
  constructor(type: string) {
    super(`Unknown discount type '${type}'.`);
  }
}
