import {MigrationInterface, QueryRunner} from 'typeorm';

export class GroupTable1687489236193 implements MigrationInterface {
    name = 'GroupTable1687489236193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "group" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createDate" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "group_teacher" (
                "groupId" integer NOT NULL,
                "teacherId" integer NOT NULL,
                CONSTRAINT "PK_a7fdae1a7925d86cc53a1650cc3" PRIMARY KEY ("groupId", "teacherId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "group_teacher"
        `);
        await queryRunner.query(`
            DROP TABLE "group"
        `);
    }
}
