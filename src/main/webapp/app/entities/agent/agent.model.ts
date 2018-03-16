import { BaseEntity } from './../../shared';

export class Agent implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public email?: string,
        public clientId?: string,
        public signOnCode?: string,
        public agency?: BaseEntity,
    ) {
    }
}
