import { BadRequestException } from '@nestjs/common';

export default class UnknownCategoryError extends BadRequestException {
  constructor(category: string) {
    super(`Unknown category '${category}'`);
  }
}
