import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ParkingStatusDTO from './dto/parking-status.dto';
import ParkingConfigService from './parking.service';
import VehicleService from './vehicle.service';

@Controller('/api/parking')
@ApiTags('Parking')
export default class ParkingController {
  constructor(
    private readonly parkingConfigService: ParkingConfigService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved parking lot status',
  })
  public async getParkingStatus(): Promise<ParkingStatusDTO> {
    const parkingSpace = await this.parkingConfigService.getParkingSize();

    return {
      total: parkingSpace,
      free: parkingSpace - (await this.vehicleService.getTakenSpace()),
    };
  }
}
