import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1701790187576 implements MigrationInterface {
  name = 'InitialMigration1701790187576'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('Site Admin', 'Primary User')
        `)
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "fullName" character varying,
                "userName" character varying,
                "email" character varying NOT NULL,
                "isEmailConfirmed" boolean NOT NULL DEFAULT false,
                "password" character varying NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'Primary User',
                "primaryUserId" uuid,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `)
    await queryRunner.query(`
            CREATE TABLE "refresh-token" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "token" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_895eefbc5efe4f52da9090b4d18" UNIQUE ("token"),
                CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "refresh-token"
        `)
    await queryRunner.query(`
            DROP TABLE "users"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `)
  }
}
