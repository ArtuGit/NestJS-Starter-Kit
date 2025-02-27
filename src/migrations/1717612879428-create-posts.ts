import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePosts1717612879428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "title" character varying NOT NULL,
        "content" text NOT NULL,
        "authorId" uuid NOT NULL,
        CONSTRAINT "PK_posts_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_posts_author" FOREIGN KEY ("authorId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_posts_author" ON "posts"("authorId")
    `)

    // Update sample post insert
    await queryRunner.query(`
      INSERT INTO "posts" ("title", "content", "authorId")
      SELECT 
        'My First Post' AS title,
        'This is my first blog post' AS content,
        id AS authorId 
      FROM "users" LIMIT 1
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_posts_author"`)
    await queryRunner.query(`DROP TABLE "posts"`)
  }
} 