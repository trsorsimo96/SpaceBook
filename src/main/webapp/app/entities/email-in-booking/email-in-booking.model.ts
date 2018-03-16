import { BaseEntity } from './../../shared';

export const enum EmailType {
    'TO',
    'FROM'
}

export class EmailInBooking implements BaseEntity {
    constructor(
        public id?: number,
        public emailType?: EmailType,
        public email?: string,
        public emails?: BaseEntity,
    ) {
    }
}
