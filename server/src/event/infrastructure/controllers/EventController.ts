import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {EventService} from '../../domain/services/EventService';
import {EventSearchDto} from '../../domain/dtos/EventSearchDto';
import {EventSchema} from '../schemas/EventSchema';
import {EventSaveDto} from '../../domain/dtos/EventSaveDto';

@Controller('/event')
@ApiTags()
export class EventController {
    constructor(
        private service: EventService,
    ) {
    }

    @Get()
    @ApiQuery({type: EventSearchDto})
    @ApiOkResponse({type: EventSchema, isArray: true})
    async get(@Query() dto: EventSearchDto) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: EventSchema, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id, null, EventSchema);
    }

    @Post()
    @ApiBody({type: EventSaveDto})
    @ApiOkResponse({type: EventSchema, isArray: false})
    async create(
        @Body() dto: EventSaveDto,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: EventSaveDto})
    @ApiOkResponse({type: EventSchema, isArray: false})
    async update(
        @Body() dto: EventSaveDto,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
