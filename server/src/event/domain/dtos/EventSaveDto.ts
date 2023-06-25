import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {EventModel} from '../models/EventModel';

export class EventSaveDto {
    @ExtendField(EventModel, {nullable: true})
    name: string;

    @ExtendField(EventModel)
    description: string;

    @ExtendField(EventModel)
    location: string;

    @ExtendField(EventModel)
    status: string;

    @ExtendField(EventModel)
    teachersIds: number[];

    @ExtendField(EventModel)
    groupsIds: number[];

    @ExtendField(EventModel)
    itemsIds: number[];

    @ExtendField(EventModel)
    startDate: string;

    @ExtendField(EventModel)
    endDate: string;

    @ExtendField(EventModel)
    budget: number;

    @ExtendField(EventModel)
    organizerId: number;
}
