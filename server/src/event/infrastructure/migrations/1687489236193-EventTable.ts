import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687489236193 implements MigrationInterface {
    name = 'EventTable1687489236193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "location" character varying NOT NULL,
                "status" character varying NOT NULL DEFAULT 'planned',
                "startDate" TIMESTAMP(0) NOT NULL,
                "endDate" TIMESTAMP(0) NOT NULL,
                "budget" integer NOT NULL,
                "organizerId" integer,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "event_teacher" (
                "eventId" integer NOT NULL,
                "teacherId" integer NOT NULL,
                CONSTRAINT "PK_e0081b5352397d8ec902bf3e3f7" PRIMARY KEY ("eventId", "teacherId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "event_group" (
                "eventId" integer NOT NULL,
                "groupId" integer NOT NULL,
                CONSTRAINT "PK_157a25b4135d460321a8a6c10a2" PRIMARY KEY ("eventId", "groupId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "event_group"
        `);
        await queryRunner.query(`
            DROP TABLE "event_teacher"
        `);
        await queryRunner.query(`
            DROP TABLE "event"
        `);
    }
}
