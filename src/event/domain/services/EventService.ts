import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {EventModel} from '../models/EventModel';
import {EventSearchDto} from '../dtos/EventSearchDto';
import {EventSaveDto} from '../dtos/EventSaveDto';
import {IEventRepository} from '../interfaces/IEventRepository';

export class EventService extends CrudService<EventModel,
    EventSearchDto,
    EventSaveDto | EventModel> {
    protected modelClass = EventModel;

    constructor(
        /** UserRepository */
        public repository: IEventRepository,
    ) {
        super();
    }
}
