import {MigrationInterface, QueryRunner} from 'typeorm';

export class TeacherTable1685965266067 implements MigrationInterface {
    name = 'TeacherTable1685965266067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "teacher" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "payment" integer NOT NULL,
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
