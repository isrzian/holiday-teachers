import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventItemTable1687489236193 implements MigrationInterface {
    name = 'EventItemTable1687489236193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event_item" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "isMoney" boolean NOT NULL DEFAULT false,
                "eventId" integer,
                "quantity" integer NOT NULL,
                "price" integer NOT NULL,
                "status" character varying NOT NULL DEFAULT 'in_warehouse',
                "updateTime" TIMESTAMP(0) NOT NULL,
                "createTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_0b8a384c1ee5dc33993b3004ae4" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "event_item"
        `);
    }
}
