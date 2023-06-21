import {
    CreateTimeField,
    DateTimeField, EnumField, IntegerField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {TeacherModel} from '../../../teacher/domain/models/TeacherModel';
import {GroupModel} from '../../../group/domain/models/GroupModel';
import {EventItemModel} from './EventItemModel';
import {EventStatusEnum} from '../enums/EventStatusEnum';

export class EventModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @StringField()
    description: string;

    @StringField()
    location: string;

    @EnumField({
        enum: EventStatusEnum,
        defaultValue: EventStatusEnum.PLANNED,
    })
    status: string;

    @RelationIdField({
        relationName: 'teachers',
        isArray: true,
    })
    teachersIds: number[];

    @RelationField({
        type: 'ManyToMany',
        isOwningSide: true,
        relationClass: () => TeacherModel,
        isArray: true,
    })
    teachers: TeacherModel[];

    @RelationIdField({
        relationName: 'groups',
        isArray: true,
    })
    groupsIds: number[];

    @RelationField({
        type: 'ManyToMany',
        isOwningSide: true,
        relationClass: () => GroupModel,
        isArray: true,
    })
    groups: GroupModel[];

    @RelationIdField({
        relationName: 'items',
        isArray: true,
    })
    itemsIds: number[];

    @RelationField({
        type: 'OneToMany',
        relationClass: () => EventItemModel,
        isArray: true,
        inverseSide: (item: EventItemModel) => item.event,
    })
    items: EventItemModel[];

    @DateTimeField({
        skipSeconds: true,
    })
    startDate: string;

    @DateTimeField({
        skipSeconds: true,
    })
    endDate: string;

    @IntegerField()
    budget: number;

    @RelationIdField({
        relationName: 'organizer',
    })
    organizerId: number;

    @RelationField({
        type: 'ManyToOne',
        relationClass: () => TeacherModel,
    })
    organizer: TeacherModel;

    @CreateTimeField()
    createTime: string;

    @UpdateTimeField()
    updateTime: string;
}
