import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export class EventItemStatusEnum extends BaseEnum {
    static USED_IN_EVENT = 'used_in_event';

    static WRITTEN_OFF = 'written_off';

    static IN_WAREHOUSE = 'in_warehouse';

    static getLabels() {
        return {
            [this.USED_IN_EVENT]: 'Используется на мероприятии',
            [this.WRITTEN_OFF]: 'Списано',
            [this.IN_WAREHOUSE]: 'На складе',
        };
    }
}
