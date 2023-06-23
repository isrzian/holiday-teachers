import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {TeacherModel} from '../models/TeacherModel';

export const ITeacherRepository = 'ITeacherRepository';

export type ITeacherRepository = ICrudRepository<TeacherModel>
