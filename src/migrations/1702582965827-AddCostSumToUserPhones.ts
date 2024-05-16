import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCostSumToUserPhones1702582965827 implements MigrationInterface {
  name = 'AddCostSumToUserPhones1702582965827'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user-phones"
            ADD COLUMN "costSum" real NOT NULL DEFAULT '0'
        `)
    await queryRunner.query(`
            ALTER TABLE "user-phones"
            ALTER COLUMN "costSum" DROP DEFAULT
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user-phones" DROP COLUMN "costSum"
        `)
  }
}
