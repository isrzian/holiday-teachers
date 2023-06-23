import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {TeacherModel} from '../models/TeacherModel';
import {TeacherSearchDto} from '../dtos/TeacherSearchDto';
import {TeacherSaveDto} from '../dtos/TeacherSaveDto';
import {ITeacherRepository} from '../interfaces/ITeacherRepository';

export class TeacherService extends CrudService<TeacherModel,
    TeacherSearchDto,
    TeacherSaveDto | TeacherModel> {
    protected modelClass = TeacherModel;

    constructor(
        /** TeacherRepository */
        public repository: ITeacherRepository,
    ) {
        super();
    }
}
