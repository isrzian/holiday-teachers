import {Controller, Get, Query} from '@nestjs/common';
import {ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
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
}
