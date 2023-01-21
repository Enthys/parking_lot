import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import VehicleSignupDTO from './dto/vehicle-signup.dto';
import Vehicle from './entity/vehicle.entity';
import VehicleService from './vehicle.service';

@Controller('/api/parking/vehicles')
@ApiTags('Parking')
export default class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vehicle has been added to parking lot',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Did not add vehicle to parking lot due to unknown vehicle type or not enough parking space',
  })
  public signupCar(@Body() dto: VehicleSignupDTO): Promise<Vehicle> {
    return this.vehicleService.signupVehicle(dto);
  }
}
