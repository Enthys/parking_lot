import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehicleDiscountTable1674314498595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle_discounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'vehicle_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'discount_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['vehicle_id'],
            referencedTableName: 'vehicles',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['discount_id'],
            referencedTableName: 'discounts',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicle_discounts', true, true, true);
  }
}
