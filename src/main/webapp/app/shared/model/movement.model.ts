import { Moment } from 'moment';
import { IVisitor } from 'app/shared/model//visitor.model';

export const enum Type {
    IN = 'IN',
    OUT = 'OUT'
}

export interface IMovement {
    id?: number;
    location?: string;
    type?: Type;
    timeStamp?: Moment;
    visitor?: IVisitor;
}

export class Movement implements IMovement {
    constructor(public id?: number, public location?: string, public type?: Type, public timeStamp?: Moment, public visitor?: IVisitor) {}
}
