import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {GroupTable} from './tables/GroupTable';
import {IGroupRepository} from '../domain/interfaces/IGroupRepository';
import {GroupRepository} from './repositories/GroupRepository';
import {GroupService} from '../domain/services/GroupService';

@Module({
    imports: [
        TypeOrmModule.forFeature([GroupTable]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IGroupRepository,
            useClass: GroupRepository,
        },
        ModuleHelper.provide(GroupService, [
            IGroupRepository,
        ]),
    ],
    exports: [
        GroupService,
        IGroupRepository,
    ],
})
export class GroupModule {
}
