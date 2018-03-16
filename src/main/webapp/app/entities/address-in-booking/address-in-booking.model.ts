import { BaseEntity } from './../../shared';

export const enum TypeAddress {
    'CUSTOMER',
    'DELIVERY'
}

export class AddressInBooking implements BaseEntity {
    constructor(
        public id?: number,
        public customerName?: string,
        public streetAddress1?: string,
        public streetAddress2?: string,
        public city?: string,
        public state?: string,
        public zip?: string,
        public typeAddress?: TypeAddress,
        public address?: BaseEntity,
    ) {
    }
}
