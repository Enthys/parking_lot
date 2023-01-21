import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ParkingConfigName } from '../parking/entity/parking.entity';

export class CreateParkingConfigTable1674294538419
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parking_config',
        columns: [
          {
            name: 'config',
            type: 'enum',
            enum: Object.values(ParkingConfigName),
            isUnique: true,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '64',
          },
        ],
      }),
    );

    await queryRunner.query(`
		INSERT INTO parking_config(config, value) VALUES ('space', '200');
	`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parking_config', true, true, true);
  }
}
