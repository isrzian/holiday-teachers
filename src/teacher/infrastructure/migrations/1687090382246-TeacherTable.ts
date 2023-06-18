import {MigrationInterface, QueryRunner} from 'typeorm';

export class TeacherTable1687090382246 implements MigrationInterface {
    name = 'TeacherTable1687090382246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "groupsIds"
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "eventsIds"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "eventsIds" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "groupsIds" integer
        `);
    }
}
