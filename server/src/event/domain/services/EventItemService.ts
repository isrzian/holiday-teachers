import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {EventItemModel} from '../models/EventItemModel';
import {IEventItemRepository} from '../interfaces/IEventItemRepository';
import {EventItemSaveDto} from '../dtos/EventItemSaveDto';
import {EventItemSearchDto} from '../dtos/EventItemSearchDto';

export class EventItemService extends CrudService<EventItemModel,
    EventItemSearchDto,
    EventItemSaveDto | EventItemModel> {
    protected modelClass = EventItemModel;

    constructor(
        /** EventItemRepository */
        public repository: IEventItemRepository,
    ) {
        super();
    }
}
