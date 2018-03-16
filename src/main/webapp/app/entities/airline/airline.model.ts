import { BaseEntity } from './../../shared';

export class Airline implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public logoContentType?: string,
        public logo?: any,
        public member?: BaseEntity,
        public airline?: BaseEntity,
    ) {
    }
}
