import { ApiProperty } from '@nestjs/swagger';

export default class ParkingStatusDTO {
  @ApiProperty({
    example: 200,
    description: 'The total number of parking spaces that the parking lot has',
  })
  public total: number;

  @ApiProperty({
    example: 50,
    description: 'The number of free spots in the parking lot',
  })
  public free: number;
}
