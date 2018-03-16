import { BaseEntity } from './../../shared';

export class Agency implements BaseEntity {
    constructor(
        public id?: number,
        public pCC?: string,
        public name?: string,
        public codeIata?: string,
        public isIata?: boolean,
        public logoContentType?: string,
        public logo?: any,
        public email?: string,
        public phone?: string,
        public address?: string,
    ) {
        this.isIata = false;
    }
}
