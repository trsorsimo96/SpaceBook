import { BaseEntity } from './../../shared';

export class GroupAirlineAlliance implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
    ) {
    }
}
