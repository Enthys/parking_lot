import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVehicleCategoriesTable1674301506097
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle_categories',
        columns: [
          {
            name: 'category',
            type: 'varchar',
            length: '64',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'spaces',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vehicles',
      new TableForeignKey({
        columnNames: ['category'],
        referencedTableName: 'vehicle_categories',
        referencedColumnNames: ['category'],
      }),
    );

    await queryRunner.query(
      "INSERT INTO vehicle_categories(category, spaces) values ('A', 1), ('B', 2), ('C', 4)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicle_categories', true, true, true);
  }
}
