import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687090382246 implements MigrationInterface {
    name = 'EventTable1687090382246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "teachersIds"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP COLUMN "groupsIds"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "groupsIds" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD "teachersIds" integer
        `);
    }
}
