import { Injectable } from '@nestjs/common';
import DiscountType from './entity/discount-type.entity';
import Discount from './entity/discount.entity';
import DiscountRepository from './repository/discount.repository';

@Injectable()
export default class DiscountService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  /**
   * create a new discount record which then can be used to be applied on
   * different entities.
   *
   * @param discountType
   */
  public createDiscount(discountType: DiscountType): Promise<Discount> {
    return this.discountRepository.new(discountType);
  }
}
