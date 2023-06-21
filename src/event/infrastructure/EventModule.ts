import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {EventTable} from './tables/EventTable';
import {IEventRepository} from '../domain/interfaces/IEventRepository';
import {EventRepository} from './repositories/EventRepository';
import {EventService} from '../domain/services/EventService';
import {EventItemService} from '../domain/services/EventItemService';
import {IEventItemRepository} from '../domain/interfaces/IEventItemRepository';
import {EventItemRepository} from './repositories/EventItemRepository';
import {EventItemTable} from './tables/EventItemTable';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventTable, EventItemTable]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IEventRepository,
            useClass: EventRepository,
        },
        {
            provide: IEventItemRepository,
            useClass: EventItemRepository,
        },
        ModuleHelper.provide(EventService, [
            IEventRepository,
        ]),
        ModuleHelper.provide(EventItemService, [
            IEventItemRepository,
        ]),
    ],
    exports: [
        EventService,
        IEventRepository,
        EventItemService,
        IEventItemRepository,
    ],
})
export class EventModule {
}
