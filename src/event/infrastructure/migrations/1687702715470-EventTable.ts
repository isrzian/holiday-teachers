import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687702715470 implements MigrationInterface {
    name = 'EventTable1687702715470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event"
            ALTER COLUMN "status" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event"
            ALTER COLUMN "status"
            SET NOT NULL
        `);
    }
}
