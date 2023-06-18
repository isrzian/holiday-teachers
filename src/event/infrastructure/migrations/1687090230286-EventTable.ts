import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687090230286 implements MigrationInterface {
    name = 'EventTable1687090230286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "teachersIds" integer,
                "groupsIds" integer,
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
