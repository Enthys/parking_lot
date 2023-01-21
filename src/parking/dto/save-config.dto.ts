import { ParkingConfigName } from '../entity/parking.entity';

export default class SaveConfigDTO {
  public config: ParkingConfigName;

  public value: string;
}
