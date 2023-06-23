import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {GroupModel} from '../../domain/models/GroupModel';
import {GroupTable} from '../tables/GroupTable';

@Injectable()
export class GroupRepository extends CrudRepository<GroupModel> {
    constructor(
        @InjectRepository(GroupTable)
        public dbRepository: Repository<GroupTable>,
    ) {
        super();
    }

    protected modelClass = GroupModel;
}
