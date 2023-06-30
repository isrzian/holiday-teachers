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
    groupsIds: number[];

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => GroupModel,
        isOwningSide: false,
        isArray: true,
        inverseSide: (group: GroupModel) => group.teachers,
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
        inverseSide: (event: EventModel) => event.teachers,
    })
    events: EventModel[];

    @RelationIdField({
        relationName: 'organizationEvents',
        isArray: true,
    })
    organizationEventsIds: number[];

    @RelationField({
        type: 'OneToMany',
        relationClass: () => EventModel,
        inverseSide: (event: EventModel) => event.organizer,
        isArray: true,
    })
    organizationEvents: EventModel[];

    @CreateTimeField()
    createDate: string;
}
