import { MigrationInterface, QueryRunner } from 'typeorm'

export class DeletedUser1717612879425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users
            add deleted BOOLEAN default false not null;
            create index users_deleted_index
                on users (deleted);

        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users
            drop column deleted;
        `)
  }
}
