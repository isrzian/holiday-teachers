import {
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField, UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {TeacherModel} from '../../../teacher/domain/models/TeacherModel';
import {EventModel} from '../../../event/domain/models/EventModel';
import {EventItemModel} from '../../../event/domain/models/EventItemModel';

export class GroupModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @RelationIdField({
        relationName: 'teachers',
        isArray: true,
    })
    teachersIds: number[];

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => TeacherModel,
        isOwningSide: true,
    })
    teachers: TeacherModel[];

    @RelationIdField({
        relationName: 'events',
        isArray: true,
    })
    eventsIds: number[];

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => EventModel,
        isOwningSide: false,
        isArray: true,
    })
    events: EventModel[];

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

    @CreateTimeField()
    createDate: string;

    @UpdateTimeField()
    updateTime: string;
}
