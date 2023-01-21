import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDiscountsTable1674298671365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'discounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'percent',
            type: 'float',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('discounts', true, true, true);
  }
}
