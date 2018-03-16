import { BaseEntity } from './../../shared';

export const enum PhoneType {
    'ACCOMODATION',
    'AGENCY',
    'EMAIL',
    'FAX',
    'HOME',
    'MOBILE',
    'NOCONTACT',
    'OTHER',
    'WORK'
}

export class PhoneInBooking implements BaseEntity {
    constructor(
        public id?: number,
        public phoneType?: PhoneType,
        public number?: string,
        public booking?: BaseEntity,
    ) {
    }
}
