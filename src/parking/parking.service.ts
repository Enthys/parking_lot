import { Injectable } from '@nestjs/common';
import SaveConfigDTO from './dto/save-config.dto';
import ParkingConfig, { ParkingConfigName } from './entity/parking.entity';
import MissingParkingConfigError from './error/missing-parking-config.error';
import ParkingConfigRepository from './repository/parking.repository';

@Injectable()
export default class ParkingConfigService {
  constructor(private readonly parkingRepository: ParkingConfigRepository) {}

  /**
   * saveConfig will initially attempt to store the configuration provided to the database if the configuration does
   * not exist. If the configuration already exists it will not attempt to save the configuration to the database.
   */
  public async saveConfig(dto: SaveConfigDTO): Promise<ParkingConfig> {
    if (await this.parkingRepository.exists(dto.config)) {
      return;
    }

    return this.parkingRepository.save(dto.config, dto.value);
  }

  /**
   * getParkingSize will attempt to retrieve the size of the parking lot from the database. If it fails to retrieve the
   * size of the parking lot then it will throw a `MissingParkingConfigError`.
   *
   * @throws {MissingParkingConfigError}
   */
  public async getParkingSize(): Promise<number> {
    const config = await this.parkingRepository.get(ParkingConfigName.Space);
    if (!config) {
      throw new MissingParkingConfigError(ParkingConfigName.Space);
    }

    return Number(config.value);
  }
}
