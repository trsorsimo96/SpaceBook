import { BaseEntity } from './../../shared';

export class Town implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public country?: BaseEntity,
        public phone?: BaseEntity,
    ) {
    }
}
