import { BaseEntity } from './../../shared';

export class Corporate implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public address?: string,
        public phone?: string,
    ) {
    }
}
