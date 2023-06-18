import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {GroupModel} from '../models/GroupModel';
import {IGroupRepository} from '../interfaces/IGroupRepository';
import {GroupSearchDto} from '../dtos/GroupSearchDto';
import {GroupSaveDto} from '../dtos/GroupSaveDto';

export class GroupService extends CrudService<GroupModel,
    GroupSearchDto,
    GroupSaveDto | GroupModel> {
    protected modelClass = GroupModel;

    constructor(
        /** GroupRepository */
        public repository: IGroupRepository,
    ) {
        super();
    }
}
