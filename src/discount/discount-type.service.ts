import { Injectable } from '@nestjs/common';
import DiscountType from './entity/discount-type.entity';
import UnknownDiscountTypeError from '../error/unknown-discount-type.error';
import DiscountTypeRepository from './repository/dicount-type.repository';

@Injectable()
export default class DiscountTypeService {
  constructor(
    private readonly discountTypeRepository: DiscountTypeRepository,
  ) {}

  /**
   * getDiscountType returns the discount type from the database which has the
   * provided type.
   *
   * If no discount type is found then a `UnknownDiscountTypeError` will be
   * thrown.
   *
   * @param {string} type
   * @throws {UnknownDiscountTypeError}
   */
  public async getDiscountType(type: string): Promise<DiscountType> {
    const discountType = await this.discountTypeRepository.get(type);
    if (!discountType) {
      throw new UnknownDiscountTypeError(type);
    }

    return discountType;
  }
}
