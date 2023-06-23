import {MigrationInterface, QueryRunner} from 'typeorm';

export class EventTable1687489236194 implements MigrationInterface {
    name = 'EventTable1687489236194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_db30dd66af306f806b99bd5eb9" ON "event_teacher" ("eventId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b52ced30798e89eeda81f7e992" ON "event_teacher" ("teacherId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1b38895e36be8bcac6f0407570" ON "event_group" ("eventId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_129ac1e45bfbf2a21393489b05" ON "event_group" ("groupId")
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0" FOREIGN KEY ("organizerId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "event_teacher"
            ADD CONSTRAINT "FK_db30dd66af306f806b99bd5eb93" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "event_teacher"
            ADD CONSTRAINT "FK_b52ced30798e89eeda81f7e992e" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "event_group"
            ADD CONSTRAINT "FK_1b38895e36be8bcac6f04075708" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "event_group"
            ADD CONSTRAINT "FK_129ac1e45bfbf2a21393489b055" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_group" DROP CONSTRAINT "FK_129ac1e45bfbf2a21393489b055"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_group" DROP CONSTRAINT "FK_1b38895e36be8bcac6f04075708"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_teacher" DROP CONSTRAINT "FK_b52ced30798e89eeda81f7e992e"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_teacher" DROP CONSTRAINT "FK_db30dd66af306f806b99bd5eb93"
        `);
        await queryRunner.query(`
            ALTER TABLE "event" DROP CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_129ac1e45bfbf2a21393489b05"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1b38895e36be8bcac6f0407570"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b52ced30798e89eeda81f7e992"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_db30dd66af306f806b99bd5eb9"
        `);
    }
}
