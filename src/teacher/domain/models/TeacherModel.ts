import {
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {GroupModel} from '../../../group/domain/models/GroupModel';
import {EventModel} from '../../../event/domain/models/EventModel';

export class TeacherModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @StringField()
    phone: string;

    @RelationIdField({
        relationName: 'groups',
        isArray: true,
    })
    groupsIds: number[]

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => GroupModel,
        isOwningSide: false,
        isArray: true,
    })
    groups: GroupModel[];

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

    @CreateTimeField()
    createDate: string;
}
