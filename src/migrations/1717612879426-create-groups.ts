import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateGroups1717612879426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create groups table
    await queryRunner.query(`
      CREATE TABLE "groups" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "name" character varying NOT NULL,
        "description" character varying,
        "adminId" uuid,
        CONSTRAINT "PK_groups_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_groups_admin" FOREIGN KEY ("adminId") 
          REFERENCES "users"("id") ON DELETE SET NULL
      )
    `)

    // Create join table for many-to-many relationship between groups and users
    await queryRunner.query(`
      CREATE TABLE "group_members" (
        "group_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_group_members" PRIMARY KEY ("group_id", "user_id"),
        CONSTRAINT "FK_group_members_group" FOREIGN KEY ("group_id") 
          REFERENCES "groups"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_group_members_user" FOREIGN KEY ("user_id") 
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `)

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_groups_admin" ON "groups"("adminId")
    `)
    await queryRunner.query(`
      CREATE INDEX "IDX_group_members_group" ON "group_members"("group_id")
    `)
    await queryRunner.query(`
      CREATE INDEX "IDX_group_members_user" ON "group_members"("user_id")
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables and indexes in reverse order
    await queryRunner.query(`DROP INDEX "IDX_group_members_user"`)
    await queryRunner.query(`DROP INDEX "IDX_group_members_group"`)
    await queryRunner.query(`DROP INDEX "IDX_groups_admin"`)
    await queryRunner.query(`DROP TABLE "group_members"`)
    await queryRunner.query(`DROP TABLE "groups"`)
  }
}
