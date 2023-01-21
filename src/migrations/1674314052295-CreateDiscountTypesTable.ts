import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDiscountTypesTable1674314052295
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'discount_types',
        columns: [
          {
            name: 'type',
            type: 'varchar',
            length: '64',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'discount',
            type: 'float',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.query(` INSERT INTO discount_types(type, discount) VALUES
       ('silver', 10),
       ('gold', 15),
       ('platinum', 20)
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('discount_types', true, true, true);
  }
}
