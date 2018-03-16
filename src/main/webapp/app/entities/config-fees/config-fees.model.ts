import { BaseEntity } from './../../shared';

export class ConfigFees implements BaseEntity {
    constructor(
        public id?: number,
        public fees?: number,
    ) {
    }
}
