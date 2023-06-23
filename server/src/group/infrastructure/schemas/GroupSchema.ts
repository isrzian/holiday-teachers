import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {GroupModel} from '../../domain/models/GroupModel';

export class GroupSchema {
    @ExtendField(GroupModel)
    name: string;

    @ExtendField(GroupModel)
    teachersIds: number[];

    @ExtendField(GroupModel)
    eventsIds: number[];

    @ExtendField(GroupModel)
    itemsIds: number[];

    @ExtendField(GroupModel)
    id: number;

    @ExtendField(GroupModel)
    createDate: string;

    @ExtendField(GroupModel)
    updateTime: string;
}
