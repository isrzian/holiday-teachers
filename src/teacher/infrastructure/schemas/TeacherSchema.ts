import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {TeacherModel} from '../../domain/models/TeacherModel';

export class TeacherSchema {
    @ExtendField(TeacherModel)
    id: number;

    @ExtendField(TeacherModel)
    name: string;

    @ExtendField(TeacherModel)
    phone: string;

    @ExtendField(TeacherModel)
    groupsIds: number[];

    @ExtendField(TeacherModel)
    eventsIds: number[];

    @ExtendField(TeacherModel)
    organizationEventsIds: number[];

    @ExtendField(TeacherModel)
    createDate: string;
}
