import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {EventItemModel} from '../models/EventItemModel';

export class EventItemSaveDto {
    @ExtendField(EventItemModel)
    name: string;

    @ExtendField(EventItemModel)
    description: string;

    @ExtendField(EventItemModel)
    eventId: number;

    @ExtendField(EventItemModel)
    quantity: number;

    @ExtendField(EventItemModel)
    price: number;

    @ExtendField(EventItemModel)
    status: string;

    @ExtendField(EventItemModel)
    isMoney: boolean;
}
