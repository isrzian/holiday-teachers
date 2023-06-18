import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {EventModel} from '../models/EventModel';

export const IEventRepository = 'IEventRepository';

export type IEventRepository = ICrudRepository<EventModel>
