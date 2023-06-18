import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {GroupModel} from '../../domain/models/GroupModel';

@TableFromModel(GroupModel, 'group')
export class GroupTable implements DeepPartial<GroupModel> {}
