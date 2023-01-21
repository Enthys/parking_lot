import { InternalServerErrorException } from '@nestjs/common';

export default class MissingCategoryHourlyRatesError extends InternalServerErrorException {
  constructor(category: string) {
    super(`Could not find hourly rates for category '${category}'`);
  }
}
