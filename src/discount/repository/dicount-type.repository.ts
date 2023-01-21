import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DiscountType from '../entity/discount-type.entity';

@Injectable()
export default class DiscountTypeRepository {
  constructor(
    @InjectRepository(DiscountType)
    private readonly repository: Repository<DiscountType>,
  ) {}

  public get(type: string): Promise<DiscountType> {
    return this.repository.findOne({ where: { type: type } });
  }
}
