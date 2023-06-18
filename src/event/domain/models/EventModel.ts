import {
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {TeacherModel} from '../../../teacher/domain/models/TeacherModel';
import {GroupModel} from '../../../group/domain/models/GroupModel';

export class EventModel {
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

    @CreateTimeField()
    createTime: string;

    @UpdateTimeField()
    updateTime: string;
}
