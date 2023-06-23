import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventItemTable1687346610574 implements MigrationInterface {
    name = 'EventItemTable1687346610574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item"
            ADD CONSTRAINT "FK_240303484dbe00aa45b2cf86a2b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_item" DROP CONSTRAINT "FK_240303484dbe00aa45b2cf86a2b"
        `);
    }
}
