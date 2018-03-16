import { BaseEntity } from './../../shared';

export class Airport implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public origin?: BaseEntity,
        public destination?: BaseEntity,
        public airport?: BaseEntity,
    ) {
    }
}
