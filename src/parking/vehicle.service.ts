import { Injectable } from '@nestjs/common';
import VehicleSignupDTO from './dto/vehicle-signup.dto';
import VehicleTypeCategory from './entity/vehicle-type-category.entity';
import Vehicle from './entity/vehicle.entity';
import NotEnoughParkingSpacesError from './error/not-enough-parking-spaces.error';
import VehicleAlreadyInLotError from './error/vehicle-already-in-lot.error';
import VehicleNotParkedError from './error/vehicle-not-parked.error';
import ParkingConfigService from './parking.service';
import VehicleRepository from './repository/vehicle.repository';
import VehicleTypeCategoryService from './vehicle-type-category.service';

@Injectable()
export default class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly parkingConfigService: ParkingConfigService,
    private readonly typeCategoryService: VehicleTypeCategoryService,
  ) {}

  public async getByPlate(plate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.getByPlate(plate);
    if (!vehicle) {
      throw new VehicleNotParkedError(plate);
    }

    return vehicle;
  }

  public async signupVehicle(dto: VehicleSignupDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.getByPlate(dto.plate);
    if (vehicle) {
      throw new VehicleAlreadyInLotError(dto.plate);
    }

    const type = await this.typeCategoryService.getTypeCategory(
      dto.vehicleType,
    );

    if (!this.hasEnoughSpace(type)) {
      throw new NotEnoughParkingSpacesError();
    }

    return this.vehicleRepository.addToLot(dto.plate, type.category);
  }

  public getTakenSpace(): Promise<number> {
    return this.vehicleRepository.takenSpace();
  }

  private async hasEnoughSpace(type: VehicleTypeCategory): Promise<boolean> {
    const [totalSpace, takenSpace] = await Promise.all([
      this.parkingConfigService.getParkingSize(),
      this.vehicleRepository.takenSpace(),
    ]);

    return totalSpace - takenSpace - type.category.spaces >= 0;
  }
}
