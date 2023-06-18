import {MigrationInterface, QueryRunner} from 'typeorm';

export class GroupTable1687090230287 implements MigrationInterface {
    name = 'GroupTable1687090230287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_d7c554f41a2cd91eac7d8375bc" ON "group_teacher" ("groupId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_fffe4b9e8ec71e95b858ab458b" ON "group_teacher" ("teacherId")
        `);
        await queryRunner.query(`
            ALTER TABLE "group_teacher"
            ADD CONSTRAINT "FK_d7c554f41a2cd91eac7d8375bc9" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "group_teacher"
            ADD CONSTRAINT "FK_fffe4b9e8ec71e95b858ab458ba" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "group_teacher" DROP CONSTRAINT "FK_fffe4b9e8ec71e95b858ab458ba"
        `);
        await queryRunner.query(`
            ALTER TABLE "group_teacher" DROP CONSTRAINT "FK_d7c554f41a2cd91eac7d8375bc9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fffe4b9e8ec71e95b858ab458b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d7c554f41a2cd91eac7d8375bc"
        `);
    }
}
