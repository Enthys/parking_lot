import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DiscountTypeService from './discount-type.service';
import DiscountService from './discount.service';
import DiscountType from './entity/discount-type.entity';
import Discount from './entity/discount.entity';
import DiscountTypeRepository from './repository/dicount-type.repository';
import DiscountRepository from './repository/discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, DiscountType])],
  providers: [
    DiscountService,
    DiscountTypeService,

    DiscountRepository,
    DiscountTypeRepository,
  ],
  exports: [DiscountService, DiscountTypeService],
})
export default class DiscountModule {}
