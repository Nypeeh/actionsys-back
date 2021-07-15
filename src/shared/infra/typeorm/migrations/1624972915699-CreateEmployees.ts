import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEmployees1624972915699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birthday_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'admission_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'sector',
            type: 'varchar',
          },
          {
            name: 'office',
            type: 'varchar',
          },
          {
            name: 'level',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees')
  }
}
