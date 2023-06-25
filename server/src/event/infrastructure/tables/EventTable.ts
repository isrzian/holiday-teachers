import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {EventModel} from '../../domain/models/EventModel';

@TableFromModel(EventModel, 'event')
export class EventTable implements DeepPartial<EventModel> {}
