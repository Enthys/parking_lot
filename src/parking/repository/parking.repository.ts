import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ParkingConfig from '../entity/parking.entity';

@Injectable()
export default class ParkingConfigRepository {
  constructor(
    @InjectRepository(ParkingConfig)
    private readonly repository: Repository<ParkingConfig>,
  ) {}
}
