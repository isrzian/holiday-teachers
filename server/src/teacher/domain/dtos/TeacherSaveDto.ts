import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {TeacherModel} from '../models/TeacherModel';

export class TeacherSaveDto {
    @ExtendField(TeacherModel, {
        nullable: true,
    })
    name: string;

    @ExtendField(TeacherModel, {
        nullable: true,
    })
    phone: string;

    @ExtendField(TeacherModel, {
        nullable: true,
    })
    groupsIds: number[];

    @ExtendField(TeacherModel, {
        nullable: true,
    })
    eventsIds: number[];

    @ExtendField(TeacherModel, {
        nullable: true,
    })
    organizationEventsIds: number[];
}
