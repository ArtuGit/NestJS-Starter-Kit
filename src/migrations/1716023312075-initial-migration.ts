import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1716023312075 implements MigrationInterface {
  name = InitialMigration1716023312075.name

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('Site Admin', 'Regular User')
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
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'Regular User',
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_users_email" ON "users" ("email")
        `)
    await queryRunner.query(`
            CREATE TABLE "refresh-token" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "token" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_refresh_token_token" UNIQUE ("token"),
                CONSTRAINT "PK_refresh_token_id" PRIMARY KEY ("id")
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
