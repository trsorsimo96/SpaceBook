import { BaseEntity } from './../../shared';

export class Town implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public town?: BaseEntity,
        public city?: BaseEntity,
    ) {
    }
}
