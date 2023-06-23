import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {GroupService} from '../../domain/services/GroupService';
import {GroupSearchDto} from '../../domain/dtos/GroupSearchDto';
import {GroupSchema} from '../schemas/GroupSchema';
import {GroupSaveDto} from '../../domain/dtos/GroupSaveDto';

@Controller('/group')
@ApiTags('Группы')
export class GroupController {
    constructor(
        private service: GroupService,
    ) {
    }

    @Get()
    @ApiQuery({type: GroupSearchDto})
    @ApiOkResponse({type: GroupSchema, isArray: true})
    async search(
        @Query() dto: GroupSearchDto,
    ) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: GroupSchema, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    @ApiBody({type: GroupSaveDto})
    @ApiOkResponse({type: GroupSchema, isArray: false})
    async create(
        @Body() dto: GroupSaveDto,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: GroupSaveDto})
    @ApiOkResponse({type: GroupSchema, isArray: false})
    async update(
        @Body() dto: GroupSaveDto,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
