import { Injectable } from '@nestjs/common';
import VehicleTypeCategory from '../vehicle/entity/vehicle-type-category.entity';
import Vehicle from '../vehicle/entity/vehicle.entity';
import VehicleTypeCategoryService from '../vehicle/vehicle-type-category.service';
import VehicleService from '../vehicle/vehicle.service';
import VehicleSignupDTO from './dto/vehicle-signup.dto';
import { ParkingConfigName } from './entity/parking.entity';
import MissingParkingConfigError from '../error/missing-parking-config.error';
import NotEnoughParkingSpacesError from '../error/not-enough-parking-spaces.error';
import UnsupportedVehicleTypeError from '../error/unsupported-vehicle-type.error';
import VehicleAlreadyInLotError from '../error/vehicle-already-in-lot.error';
import ParkingConfigRepository from './repository/parking.repository';

@Injectable()
export default class ParkingService {
  constructor(
    private readonly parkingRepository: ParkingConfigRepository,
    private readonly vehicleService: VehicleService,
    private readonly vehicleTypeCategoryService: VehicleTypeCategoryService,
  ) {}

  /**
   * getParkingSize will attempt to retrieve the size of the parking lot from the database. If it fails to retrieve the
   * size of the parking lot then it will throw a `MissingParkingConfigError`.
   *
   * @throws {MissingParkingConfigError}
   */
  public async getParkingSize(): Promise<number> {
    const config = await this.parkingRepository.get(ParkingConfigName.Space);
    if (!config) {
      throw new MissingParkingConfigError(ParkingConfigName.Space);
    }

    return Number(config.value);
  }

  /**
   * signupVehicle will attempt to save the vehicle to the database.
   *
   * If the parking lot already contains a vehicle with * the same plate it will
   * throw a `VehicleAlreadyInLotError`.
   *
   * If the provided type of the car is not registered in the database it will
   * throw a `UnsupportedVehicleTypeError`
   *
   * If there is not enough space for the car in the database it will throw a
   * `NotEnoughParkingSpacesError`
   *
   * @param {VehicleSignupDTO} dto
   * @throws {VehicleAlreadyInLotError}
   * @throws {UnsupportedVehicleTypeError}
   * @throws {NotEnoughParkingSpacesError}
   */
  public async signupVehicle(dto: VehicleSignupDTO): Promise<Vehicle> {
    // check if vehicle is already in lot
    if (await this.vehicleService.inLot(dto.plate)) {
      throw new VehicleAlreadyInLotError(dto.plate);
    }

    // validate that the vehicle type is allowed in the parking lot
    const type = await this.vehicleTypeCategoryService.getTypeCategory(
      dto.vehicleType,
    );
    if (!type) {
      throw new UnsupportedVehicleTypeError(dto.vehicleType);
    }

    // check if there is enough space in the parking lot
    if (!(await this.hasEnoughSpace(type))) {
      throw new NotEnoughParkingSpacesError();
    }

    return await this.vehicleService.addToLot(dto.plate, type.category);
  }

  /**
   * hasEnoughSpace calculates the remaining space in the parking lot by taking
   * the total amount of spaces in the parking lot are removing the amount of
   * sports that are taken by cars in the parking lot.
   * remaining = total - occupied_spaces
   *
   * @param type
   * @private
   */
  private async hasEnoughSpace(type: VehicleTypeCategory): Promise<boolean> {
    const [totalSpace, takenSpace] = await Promise.all([
      this.getParkingSize(),
      this.vehicleService.getTakenSpace(),
    ]);

    return totalSpace - takenSpace - type.category.spaces >= 0;
  }
}
