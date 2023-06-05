import {IntegerField, PrimaryKeyField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class TeacherModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @StringField()
    phone: string;

    @IntegerField({
        min: 0,
    })
    payment: number;
}
