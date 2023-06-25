import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {EventModel} from '../../domain/models/EventModel';
import {TeacherSchema} from '../../../teacher/infrastructure/schemas/TeacherSchema';

export class EventSchema {
    @ExtendField(EventModel)
    id: number;

    @ExtendField(EventModel)
    name: string;

    @ExtendField(EventModel)
    description: string;

    @ExtendField(EventModel)
    location: string;

    @ExtendField(EventModel)
    status: string;

    @ExtendField(EventModel)
    teachersIds: number[];

    @ExtendField(EventModel, {
        relationClass: () => TeacherSchema,
        isArray: true,
    })
    teachers: TeacherSchema[];

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

    @ExtendField(EventModel)
    createTime: string;

    @ExtendField(EventModel)
    updateTime: string;
}
