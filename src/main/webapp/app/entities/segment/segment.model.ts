import { BaseEntity } from './../../shared';

export class Segment implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
    ) {
    }
}
