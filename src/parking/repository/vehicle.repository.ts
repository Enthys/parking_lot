import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import VehicleCategory from '../entity/vehicle-category.entity';
import Vehicle from '../entity/vehicle.entity';

@Injectable()
export default class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle) private readonly repository: Repository<Vehicle>,
  ) {}

  public addToLot(plate: string, category: VehicleCategory): Promise<Vehicle> {
    return this.repository.save(
      this.repository.create({
        plate,
        category,
      }),
    );
  }

  public getByPlate(plate: string): Promise<Vehicle> {
    return this.repository.findOne({ where: { plate } });
  }

  public parkedCars(): Promise<Vehicle[]> {
    return this.repository.find({
      where: { exit: IsNull() },
    });
  }

  public async takenSpace(): Promise<number> {
    const res = await this.repository.query(`
		SELECT SUM(categories.spaces) as total FROM vehicles as vehicles
			JOIN vehicle_categories as categories ON vehicles.category = categories.category
			WHERE vehicles.exit IS NULL
	`);

    return res[0]['total'];
  }
}
