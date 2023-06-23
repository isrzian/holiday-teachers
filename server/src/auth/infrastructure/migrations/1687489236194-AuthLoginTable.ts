import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthLoginTable1687489236194 implements MigrationInterface {
    name = 'AuthLoginTable1687489236194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_login"
            ADD CONSTRAINT "FK_be3b69b6401c63364432156b344" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_login" DROP CONSTRAINT "FK_be3b69b6401c63364432156b344"
        `);
    }
}
