import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import DiscountTypeService from '../discount/discount-type.service';
import DiscountService from '../discount/discount.service';
import Vehicle from '../vehicle/entity/vehicle.entity';
import ExitStatusDto from './dto/exit-status.dto';
import ParkingStatusDTO from './dto/parking-status.dto';
import VehicleSignupDTO from './dto/vehicle-signup.dto';
import VehicleStatusDTO from './dto/vehicle-status.dto';
import HourlyRateService from './hourly-rate.service';
import ParkingService from './parking.service';
import VehicleService from '../vehicle/vehicle.service';
import VehicleDiscountService from './vehicle-discount.service';

@Controller('/api/parking')
@ApiTags('Parking')
export default class ParkingController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly discountTypeService: DiscountTypeService,
    private readonly vehicleDiscountService: VehicleDiscountService,
    private readonly discountService: DiscountService,
    private readonly parkingService: ParkingService,
    private readonly hourlyRateService: HourlyRateService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved parking lot status',
  })
  public async getParkingStatus(): Promise<ParkingStatusDTO> {
    const parkingSpace = await this.parkingService.getParkingSize();

    return {
      total: parkingSpace,
      free: parkingSpace - (await this.vehicleService.getTakenSpace()),
    };
  }

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
  public async signupCar(@Body() dto: VehicleSignupDTO): Promise<Vehicle> {
    const vehicle = await this.parkingService.signupVehicle(dto);

    if (dto.discount) {
      const discountType = await this.discountTypeService.getDiscountType(
        dto.discount,
      );

      const discount = await this.discountService.createDiscount(discountType);
      await this.vehicleDiscountService.setDiscount(vehicle, discount);
    }

    return vehicle;
  }

  @Get('vehicles/:plate')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned the stats for the car successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Car was not found in the parking lot.',
  })
  public async getParkedCarInformation(
    @Param('plate') plate: string,
  ): Promise<VehicleStatusDTO> {
    const vehicle = await this.vehicleService.getByPlate(plate);

    return {
      plate: vehicle.plate,
      enter: vehicle.enter,
      total: await this.hourlyRateService.getVehicleBill(vehicle),
    };
  }

  @Delete('vehicles/:plate')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Car has been removed from parking lot.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Car was not found in the parking lot.',
  })
  public async removeCarFromParkingLot(
    @Param('plate') plate: string,
  ): Promise<ExitStatusDto> {
    const vehicle = await this.vehicleService.getByPlate(plate);

    const exitDate = await this.vehicleService.removeFromParkingLot(vehicle);

    return {
      plate: vehicle.plate,
      enter: vehicle.enter,
      exit: exitDate,
      total: await this.hourlyRateService.getVehicleBill(vehicle),
    };
  }
}
