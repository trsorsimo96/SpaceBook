import { BaseEntity } from './../../shared';

export const enum FormOfPayment {
    'CASH',
    'CHECK',
    'CREDITCARD',
    'ENETT',
    'OTHER'
}

export class Booking implements BaseEntity {
    constructor(
        public id?: number,
        public pnr?: string,
        public formOfPayment?: FormOfPayment,
        public cost?: number,
    ) {
    }
}
