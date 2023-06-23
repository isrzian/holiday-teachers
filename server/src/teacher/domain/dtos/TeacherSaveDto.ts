import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {TeacherModel} from '../models/TeacherModel';

export class TeacherSaveDto {
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
}
