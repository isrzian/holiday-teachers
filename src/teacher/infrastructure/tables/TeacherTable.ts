import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {TeacherModel} from '../../domain/models/TeacherModel';

@TableFromModel(TeacherModel, 'teacher')
export class TeacherTable implements DeepPartial<TeacherModel> {}
