import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import VehicleType from '../enum/vehicle-type.enum';

export default class VehicleSignupDTO {
  @ApiProperty({
    required: true,
    description: 'The plate number of the vehicle',
  })
  @IsString()
  @MaxLength(64)
  public plate: string;

  @ApiProperty({
    enum: VehicleType,
    required: true,
    description: `The type of the vehicle. 
	  Depending on the type the vehicle will take a different amount of space in the parking lot.`,
  })
  @IsEnum(VehicleType)
  public vehicleType: VehicleType;
}
