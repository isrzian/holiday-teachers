import {MigrationInterface, QueryRunner} from 'typeorm';

export class TeacherTable1687090230287 implements MigrationInterface {
    name = 'TeacherTable1687090230287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "payment"
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "groupsIds" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "eventsIds" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "createDate" TIMESTAMP(0) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "createDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "eventsIds"
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher" DROP COLUMN "groupsIds"
        `);
        await queryRunner.query(`
            ALTER TABLE "teacher"
            ADD "payment" integer NOT NULL
        `);
    }
}
