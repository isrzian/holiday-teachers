import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {EventItemTable} from '../tables/EventItemTable';
import {EventItemModel} from '../../domain/models/EventItemModel';

@Injectable()
export class EventItemRepository extends CrudRepository<EventItemModel> {
    constructor(
        @InjectRepository(EventItemTable)
        public dbRepository: Repository<EventItemTable>,
    ) {
        super();
    }

    protected modelClass = EventItemModel;
}
