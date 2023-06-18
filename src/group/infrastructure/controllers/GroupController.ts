import {Controller, Get, Query} from '@nestjs/common';
import {ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {GroupService} from '../../domain/services/GroupService';
import {GroupSearchDto} from '../../domain/dtos/GroupSearchDto';
import {GroupModel} from '../../domain/models/GroupModel';

@Controller('/group')
@ApiTags('Группы')
export class GroupController {
    constructor(
        private service: GroupService,
    ) {
    }

    @Get()
    @ApiQuery({type: GroupSearchDto})
    @ApiOkResponse({type: GroupModel, isArray: true})
    async get(@Query() dto: GroupSearchDto) {
        return this.service.search(dto);
    }
}
