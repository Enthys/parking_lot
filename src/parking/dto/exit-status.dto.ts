import { ApiProperty } from '@nestjs/swagger';
import VehicleStatusDTO from './vehicle-status.dto';

export default class ExitStatusDto extends VehicleStatusDTO {
  @ApiProperty({
    description: 'The time at which the car had exited the parking lot.',
  })
  public exit: Date;
}
