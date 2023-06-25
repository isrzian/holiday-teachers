import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventItemTable1687702715470 implements MigrationInterface {
    name = 'EventItemTable1687702715470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item"
            ALTER COLUMN "status" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item"
            ALTER COLUMN "status"
            SET NOT NULL
        `);
    }
}
