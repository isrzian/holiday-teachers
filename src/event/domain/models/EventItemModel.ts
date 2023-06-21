import {
    CreateTimeField,
    EnumField,
    IntegerField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {EventModel} from './EventModel';
import {EventItemStatusEnum} from '../enums/EventItemStatus';

export class EventItemModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @StringField()
    description: string;

    @RelationIdField()
    eventId: number;

    @RelationField({
        type: 'ManyToOne',
        relationClass: () => EventModel,
    })
    event: EventModel;

    @IntegerField()
    quantity: number;

    @IntegerField()
    price: number;

    @EnumField({
        enum: EventItemStatusEnum,
        defaultValue: EventItemStatusEnum.IN_WAREHOUSE,
    })
    status: string;

    @UpdateTimeField()
    updateTime: string;

    @CreateTimeField()
    createTime: string;
}
