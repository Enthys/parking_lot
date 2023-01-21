import { Injectable } from '@nestjs/common';
import VehicleCategory from './entity/vehicle-category.entity';
import Vehicle from './entity/vehicle.entity';
import VehicleNotParkedError from '../error/vehicle-not-parked.error';
import VehicleRepository from './repository/vehicle.repository';

@Injectable()
export default class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  /**
   * getByPlate attempts to retrieve the vehicle which has the provided plate
   * number.
   *
   * If there is no vehicle with the provided plate number in the parking lot
   * then a `VehicleNotParkedError` will be thrown.
   *
   * @param plate
   * @throws {VehicleNotParkedError}
   */
  public async getByPlate(plate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.getByPlate(plate);
    if (!vehicle) {
      throw new VehicleNotParkedError(plate);
    }

    return vehicle;
  }

  /**
   * getTakenSpace returns the space taken by all the vehicles in the parking lot.
   */
  public getTakenSpace(): Promise<number> {
    return this.vehicleRepository.takenSpace();
  }

  /**
   * removeFromParkingLot update the provided vehicle's exit date to the time of
   * the execution of the method.
   *
   * @param vehicle
   */
  public async removeFromParkingLot(vehicle: Vehicle): Promise<Date> {
    const date = new Date();

    await this.vehicleRepository.setEndDate(vehicle, date);

    return date;
  }

  /**
   * addToLot adds a new vehicle to the parking lot using the provided plate and
   * category.
   *
   * @param plate
   * @param category
   */
  public addToLot(plate: string, category: VehicleCategory): Promise<Vehicle> {
    return this.vehicleRepository.addToLot(plate, category);
  }

  /**
   * inLot returns true of false depending on there being a vehicle in the
   * parking lot with the provided plate number.
   *
   * @param plate
   */
  public async inLot(plate: string): Promise<boolean> {
    return !!(await this.vehicleRepository.getByPlate(plate));
  }
}
