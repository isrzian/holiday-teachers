import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {EventService} from '../../domain/services/EventService';
import {EventSearchDto} from '../../domain/dtos/EventSearchDto';
import {EventModel} from '../../domain/models/EventModel';

@Controller('/event')
@ApiTags()
export class EventController {
    constructor(
        private service: EventService,
    ) {
    }

    @Get()
    @ApiQuery({type: EventSearchDto})
    @ApiOkResponse({type: EventModel, isArray: true})
    async get(@Query() dto: EventSearchDto) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: EventModel, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    @ApiBody({type: EventModel})
    @ApiOkResponse({type: EventModel, isArray: false})
    async create(
        @Body() dto: EventModel,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: EventModel})
    @ApiOkResponse({type: EventModel, isArray: false})
    async update(
        @Body() dto: EventModel,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
