import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery} from '@nestjs/swagger';
import {EventItemService} from '../../domain/services/EventItemService';
import {EventItemSearchDto} from '../../domain/dtos/EventItemSearchDto';
import {EventItemModel} from '../../domain/models/EventItemModel';

@Controller('/event/item')
export class EventItemController {
    constructor(
        private service: EventItemService,
    ) {
    }

    @Get()
    @ApiQuery({type: EventItemSearchDto})
    @ApiOkResponse({type: EventItemModel, isArray: true})
    async get(@Query() dto: EventItemSearchDto) {
        return this.service.search(dto);
    }

    @Get('/:id')
    @ApiOkResponse({type: EventItemModel, isArray: false})
    async getOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    @ApiBody({type: EventItemModel})
    @ApiOkResponse({type: EventItemModel, isArray: false})
    async create(
        @Body() dto: EventItemModel,
    ) {
        return this.service.create(dto);
    }

    @Post('/:id')
    @ApiBody({type: EventItemModel})
    @ApiOkResponse({type: EventItemModel, isArray: false})
    async update(
        @Body() dto: EventItemModel,
        @Param('id') id: number,
    ) {
        return this.service.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
