import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {GroupModel} from '../models/GroupModel';

export const IGroupRepository = 'IGroupRepository';

export type IGroupRepository = ICrudRepository<GroupModel>
