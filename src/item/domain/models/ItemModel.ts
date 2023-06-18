import {PrimaryKeyField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class ItemModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;
}
