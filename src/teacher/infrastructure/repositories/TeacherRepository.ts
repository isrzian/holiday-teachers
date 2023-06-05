import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {TeacherModel} from '../../domain/models/TeacherModel';
import {TeacherTable} from '../tables/TeacherTable';

@Injectable()
export class TeacherRepository extends CrudRepository<TeacherModel> {
    constructor(
        @InjectRepository(TeacherTable)
        public dbRepository: Repository<TeacherTable>,
    ) {
        super();
    }

    protected modelClass = TeacherModel;
}
