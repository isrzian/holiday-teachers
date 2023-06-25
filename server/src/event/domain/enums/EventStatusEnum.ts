import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export class EventStatusEnum extends BaseEnum {
    static IN_PROCESS = 'in_process';

    static PLANNED = 'planned';

    static COMPLETED = 'completed';

    static getLabels() {
        return {
            [this.COMPLETED]: 'Завершено',
            [this.PLANNED]: 'Запланировано',
            [this.IN_PROCESS]: 'В процессе',
        };
    }
}
