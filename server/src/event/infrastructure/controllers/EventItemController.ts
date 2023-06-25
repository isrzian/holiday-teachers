import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery} from '@nestjs/swagger';
import {EventItemService} from '../../domain/services/EventItemService';
import {EventItemSearchDto} from '../../domain/dtos/EventItemSearchDto';
import {EventItemSchema} from '../schemas/EventItemSchema';
import {EventItemSaveDto} from '../../domain/dtos/EventItemSaveDto';

@Controller('/event/item')
export class EventItemController {
    constructor(
        private service: EventItemService,
    ) {
    }

    @Get()
    @ApiQuery({type: EventItemSearchDto})
    @ApiOkResponse({type: EventItemSchema, isArray: true})
    async get(@Query() dto: EventItemSearchDto) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: EventItemSchema, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    @ApiBody({type: EventItemSaveDto})
    @ApiOkResponse({type: EventItemSchema, isArray: false})
    async create(
        @Body() dto: EventItemSaveDto,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: EventItemSaveDto})
    @ApiOkResponse({type: EventItemSchema, isArray: false})
    async update(
        @Body() dto: EventItemSaveDto,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
