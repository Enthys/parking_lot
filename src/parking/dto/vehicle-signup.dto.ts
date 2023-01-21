import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export default class VehicleSignupDTO {
  @ApiProperty({
    required: true,
    description: 'The plate number of the vehicle',
  })
  @IsString()
  @MaxLength(64)
  public plate: string;

  @ApiProperty({
    required: true,
    description: `The type of the vehicle. 
	  Depending on the type the vehicle will take a different amount of space in the parking lot.`,
  })
  @IsString()
  @IsNotEmpty()
  public vehicleType: string;

  @ApiProperty({
    required: false,
    description: `The discount which to use when calculating the final bill.`,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public discount?: string;
}
