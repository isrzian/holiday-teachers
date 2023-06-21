import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery} from '@nestjs/swagger';
import {TeacherService} from '../../domain/services/TeacherService';
import {TeacherSearchDto} from '../../domain/dtos/TeacherSearchDto';
import {TeacherModel} from '../../domain/models/TeacherModel';

@Controller('/teacher')
export class TeacherController {
    constructor(
        private service: TeacherService,
    ) {
    }

    @Get()
    @ApiQuery({type: TeacherSearchDto})
    @ApiOkResponse({type: TeacherModel, isArray: true})
    async search(
        @Query() dto: TeacherSearchDto,
    ) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: TeacherModel, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    @ApiBody({type: TeacherModel})
    @ApiOkResponse({type: TeacherModel, isArray: false})
    async create(
        @Body() dto: TeacherModel,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: TeacherModel})
    @ApiOkResponse({type: TeacherModel, isArray: false})
    async update(
        @Body() dto: TeacherModel,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
