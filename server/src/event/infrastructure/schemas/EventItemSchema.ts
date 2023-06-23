import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {EventItemModel} from '../../domain/models/EventItemModel';

export class EventItemSchema {
    @ExtendField(EventItemModel)
    id: number;

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
    updateTime: string;

    @ExtendField(EventItemModel)
    createTime: string;
}
