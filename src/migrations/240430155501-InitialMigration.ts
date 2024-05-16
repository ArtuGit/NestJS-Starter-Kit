import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1701790187576 implements MigrationInterface {
  name = 'InitialMigration1701790187576'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."transactions_transactiontype_enum" AS ENUM('Stripe Transaction', 'Internal Transaction')
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."transactions_transactionflow_enum" AS ENUM('Deposit', 'Withdraw')
        `)
    await queryRunner.query(`
            CREATE TABLE "transactions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "transactionType" "public"."transactions_transactiontype_enum" NOT NULL,
                "transactionFlow" "public"."transactions_transactionflow_enum" NOT NULL,
                "sum" real NOT NULL,
                "paymentIntentId" character varying,
                "fromUserId" uuid,
                "toUserId" uuid,
                CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('Site Admin', 'Primary User', 'Sub-User')
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
                "stripeCustomerId" character varying,
                "apiAccessKey" character varying NOT NULL,
                "primaryUserId" uuid,
                "balance" real NOT NULL DEFAULT '0',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_195eacd3796fb3c851b623111e" ON "users" ("apiAccessKey")
        `)
    await queryRunner.query(`
            CREATE TABLE "user-phones" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "number" character varying NOT NULL,
                "rentStartDate" TIMESTAMP,
                "rentEndDate" TIMESTAMP,
                "services" jsonb DEFAULT '[]',
                "timeoutId" integer,
                "userId" uuid,
                CONSTRAINT "PK_1b498659a9a18765626d67e5318" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "sms" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "smsId" character varying NOT NULL,
                "service" jsonb NOT NULL DEFAULT '{}',
                "from" character varying NOT NULL,
                "content" character varying NOT NULL,
                "receivedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "isWrongService" boolean NOT NULL DEFAULT false,
                "userPhoneId" uuid NOT NULL,
                CONSTRAINT "PK_60793c2f16aafe0513f8817eae8" PRIMARY KEY ("id")
            )
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
    await queryRunner.query(`
            ALTER TABLE "transactions"
            ADD CONSTRAINT "FK_ccbdb7637f348c5d146b5c6c3b3" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "transactions"
            ADD CONSTRAINT "FK_92c3201a4b4dc707b5d13d3fcf7" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_69687fc9039417358404ff6a4aa" FOREIGN KEY ("primaryUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "user-phones"
            ADD CONSTRAINT "FK_bb171758383ade631beacddd689" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "sms"
            ADD CONSTRAINT "FK_7f8b3be5fb610e55469b271c433" FOREIGN KEY ("userPhoneId") REFERENCES "user-phones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "sms" DROP CONSTRAINT "FK_7f8b3be5fb610e55469b271c433"
        `)
    await queryRunner.query(`
            ALTER TABLE "user-phones" DROP CONSTRAINT "FK_bb171758383ade631beacddd689"
        `)
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_69687fc9039417358404ff6a4aa"
        `)
    await queryRunner.query(`
            ALTER TABLE "transactions" DROP CONSTRAINT "FK_92c3201a4b4dc707b5d13d3fcf7"
        `)
    await queryRunner.query(`
            ALTER TABLE "transactions" DROP CONSTRAINT "FK_ccbdb7637f348c5d146b5c6c3b3"
        `)
    await queryRunner.query(`
            DROP TABLE "refresh-token"
        `)
    await queryRunner.query(`
            DROP TABLE "sms"
        `)
    await queryRunner.query(`
            DROP TABLE "user-phones"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_195eacd3796fb3c851b623111e"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `)
    await queryRunner.query(`
            DROP TABLE "users"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `)
    await queryRunner.query(`
            DROP TABLE "transactions"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."transactions_transactionflow_enum"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."transactions_transactiontype_enum"
        `)
  }
}
