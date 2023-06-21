import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687346610574 implements MigrationInterface {
    name = 'EventTable1687346610574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "description" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "location" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "status" character varying NOT NULL DEFAULT 'planned'
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "startDate" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "endDate" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "budget" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "organizerId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0" FOREIGN KEY ("organizerId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event" DROP CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "organizerId"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "budget"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "endDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "startDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "location"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "description"
        `);
    }
}
