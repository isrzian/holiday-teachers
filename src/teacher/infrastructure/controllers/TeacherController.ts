import {Controller, Get, Query} from '@nestjs/common';
import {TeacherService} from '../../domain/services/TeacherService';
import {TeacherSearchDto} from '../../domain/dtos/TeacherSearchDto';

@Controller('/teacher')
export class TeacherController {
    constructor(
        private service: TeacherService,
    ) {
    }

    @Get()
    async search(
        @Query() dto: TeacherSearchDto,
    ) {
        return this.service.search(dto);
    }
}
