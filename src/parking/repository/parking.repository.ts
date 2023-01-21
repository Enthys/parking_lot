import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SaveConfigDTO from '../dto/save-config.dto';
import ParkingConfig, { ParkingConfigName } from '../entity/parking.entity';

@Injectable()
export default class ParkingConfigRepository {
  constructor(
    @InjectRepository(ParkingConfig)
    private readonly repository: Repository<ParkingConfig>,
  ) {}

  public exists(config: ParkingConfigName): Promise<boolean> {
    return this.repository.exist({
      where: { config },
    });
  }

  public get(config: ParkingConfigName): Promise<ParkingConfig> {
    return this.repository.findOne({ where: { config } });
  }

  public save(
    config: ParkingConfigName,
    value: string,
  ): Promise<ParkingConfig> {
    return this.repository.save(
      this.repository.create({
        config,
        value,
      }),
    );
  }
}
