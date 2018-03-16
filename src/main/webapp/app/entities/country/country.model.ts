import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public capital?: string,
        public currency?: BaseEntity,
    ) {
    }
}
