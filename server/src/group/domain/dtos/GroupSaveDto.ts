import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {GroupModel} from '../models/GroupModel';

export class GroupSaveDto {
    @ExtendField(GroupModel)
    name: string;

    @ExtendField(GroupModel)
    teachersIds: number[];

    @ExtendField(GroupModel)
    eventsIds: number[];

    @ExtendField(GroupModel)
    itemsIds: number[];
}
