import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoryHourlyRatesTable1674309692488
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category_hourly_rates',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'category',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          {
            name: 'start',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'end',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['category'],
            referencedTableName: 'vehicle_categories',
            referencedColumnNames: ['category'],
          },
        ],
      }),
    );

    await queryRunner.query(`
		INSERT INTO category_hourly_rates("category", "start", "end", "price") VALUES 
		  ('A', 0, 8, 2),
		  ('A', 8, 18, 3),
		  ('A', 18, 24, 2),

		  ('B', 0, 8, 4),
		  ('B', 8, 18, 6),
		  ('B', 18, 24, 4),


		  ('C', 0, 8, 8),
		  ('C', 8, 18, 12),
		  ('C', 18, 24, 8)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category_hourly_rates', true, true, true);
  }
}
