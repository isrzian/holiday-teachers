import {MigrationInterface, QueryRunner} from 'typeorm';

export class TeacherTable1687489236193 implements MigrationInterface {
    name = 'TeacherTable1687489236193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "teacher" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "createDate" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "teacher"
        `);
    }
}
