import { BaseEntity } from './../../shared';

export const enum TitlePassenger {
    'MR',
    'MRS',
    'MISS'
}

export const enum TypePassenger {
    'ADT',
    'CHD',
    'INF'
}

export class Passenger implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public middlename?: string,
        public nameRemark?: string,
        public title?: TitlePassenger,
        public type?: TypePassenger,
        public age?: number,
        public birthday?: any,
        public passportNumber?: string,
        public enterprise?: BaseEntity,
        public passengers?: BaseEntity,
    ) {
    }
}
