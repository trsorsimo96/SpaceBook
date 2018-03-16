import { BaseEntity } from './../../shared';

export class AirLoyalty implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public card?: BaseEntity,
    ) {
    }
}
