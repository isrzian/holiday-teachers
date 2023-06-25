import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventItemTable1687354534379 implements MigrationInterface {
    name = 'EventItemTable1687354534379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item"
            ADD "isMoney" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item" DROP COLUMN "isMoney"
        `);
    }
}
