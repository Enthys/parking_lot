import { ApiProperty } from '@nestjs/swagger';

export default class VehicleStatusDTO {
  @ApiProperty({
    description: 'The plate number of the vehicle in the parking lot.',
    example: 'AA 1234 AA',
  })
  public plate: string;

  @ApiProperty({
    description: 'The time at which the car has entered the parking lot.',
  })
  public enter: Date;

  @ApiProperty({ description: 'The current amount that has to be paid.' })
  public total: number;
}
