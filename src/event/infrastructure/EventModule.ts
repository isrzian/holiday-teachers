import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {EventTable} from './tables/EventTable';
import {IEventRepository} from '../domain/interfaces/IEventRepository';
import {EventRepository} from './repositories/EventRepository';
import {EventService} from '../domain/services/EventService';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventTable]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IEventRepository,
            useClass: EventRepository,
        },
        ModuleHelper.provide(EventService, [
            IEventRepository,
        ]),
    ],
    exports: [
        EventService,
        IEventRepository,
    ],
})
export class EventModule {
}
