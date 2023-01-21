import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVehicleTypeCategoryTable1674303271455
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle_type_categories',

        columns: [
          {
            name: 'type',
            type: 'varchar',
            length: '64',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vehicle_type_categories',
      new TableForeignKey({
        columnNames: ['category'],
        referencedTableName: 'vehicle_categories',
        referencedColumnNames: ['category'],
      }),
    );

    await queryRunner.query(
      `INSERT INTO vehicle_type_categories(type, category) VALUES ('automobile', 'A'), 
	  ('motorbike', 'A'), 
	  ('van', 'B'),
	  ('bus', 'C'),
	  ('truck', 'C')
	  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicle_categories', true, true, true);
  }
}
