import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {EventItemModel} from '../models/EventItemModel';

export const IEventItemRepository = 'IEventItemRepository';

export type IEventItemRepository = ICrudRepository<EventItemModel>
