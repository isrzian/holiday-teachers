import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {TeacherTable} from './tables/TeacherTable';
import {ITeacherRepository} from '../domain/interfaces/ITeacherRepository';
import {TeacherRepository} from './repositories/TeacherRepository';
import {TeacherService} from '../domain/services/TeacherService';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherTable]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: ITeacherRepository,
            useClass: TeacherRepository,
        },
        ModuleHelper.provide(TeacherService, [
            ITeacherRepository,
        ]),
    ],
    exports: [
        TeacherService,
        ITeacherRepository,
    ],
})
export class TeacherModule {
}
