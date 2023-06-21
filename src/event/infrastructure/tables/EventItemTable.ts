import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {EventItemModel} from '../../domain/models/EventItemModel';

@TableFromModel(EventItemModel, 'event_item')
export class EventItemTable implements DeepPartial<EventItemModel> {}
