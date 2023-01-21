import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DiscountType from '../entity/discount-type.entity';
import Discount from '../entity/discount.entity';

@Injectable()
export default class DiscountRepository {
  constructor(
    @InjectRepository(Discount)
    private readonly repository: Repository<Discount>,
  ) {}

  public new(type: DiscountType): Promise<Discount> {
    return this.repository.save(this.repository.create({ type }));
  }
}
