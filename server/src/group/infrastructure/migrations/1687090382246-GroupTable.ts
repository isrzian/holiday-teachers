import {MigrationInterface, QueryRunner} from 'typeorm';

export class GroupTable1687090382246 implements MigrationInterface {
    name = 'GroupTable1687090382246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "group" DROP COLUMN "teachersIds"
        `);
        await queryRunner.query(`
            ALTER TABLE "group" DROP COLUMN "eventsIds"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "group"
            ADD "eventsIds" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "group"
            ADD "teachersIds" integer
        `);
    }
}
