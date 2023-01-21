import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehicleTable1674294730978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE vehicle_category AS ENUM ('A', 'B', 'C')",
    );

    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'vehicle_category',
            isNullable: false,
          },
          {
            name: 'plate',
            type: 'varchar',
            length: '32',
            isNullable: false,
          },
          {
            name: 'enter',
            type: 'timestamp',
            default: 'NOW()',
            isNullable: false,
          },
          {
            name: 'exit',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(
      'CREATE UNIQUE INDEX unique_parked_vehicle_idx ON vehicles (plate) WHERE exit IS NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles', true, true, true);
    await queryRunner.query('DROP TYPE vehicle_category CASCADE');
  }
}
