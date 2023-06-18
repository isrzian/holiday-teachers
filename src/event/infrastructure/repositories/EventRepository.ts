import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {EventModel} from '../../domain/models/EventModel';
import {EventTable} from '../tables/EventTable';

@Injectable()
export class EventRepository extends CrudRepository<EventModel> {
    constructor(
        @InjectRepository(EventTable)
        public dbRepository: Repository<EventTable>,
    ) {
        super();
    }

    protected modelClass = EventModel;
}
