import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameVehiclesTableTypesColumnToCategory1674300075615
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE vehicles RENAME COLUMN type TO category',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE vehicles RENAME COLUMN category TO type',
    );
  }
}
