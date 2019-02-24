import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model//employee.model';
import { IMovement } from 'app/shared/model//movement.model';

export const enum VisitorType {
    NEWJOINEE = 'NEWJOINEE',
    EMPLOYEE = 'EMPLOYEE',
    VISITOR = 'VISITOR',
    VIP = 'VIP',
    FAMILY = 'FAMILY',
    CONFERENCEATTENDEE = 'CONFERENCEATTENDEE',
    CLIENT = 'CLIENT',
    VENDOR = 'VENDOR',
    INTERVIEWEE = 'INTERVIEWEE',
    GUEST = 'GUEST'
}

export interface IVisitor {
    id?: number;
    name?: string;
    visitorId?: number;
    type?: VisitorType;
    allowedFrom?: Moment;
    allowedTo?: Moment;
    location?: string;
    email?: string;
    phone?: number;
    status?: boolean;
    qrString?: string;
    employee?: IEmployee;
    movements?: IMovement[];
}

export class Visitor implements IVisitor {
    constructor(
        public id?: number,
        public name?: string,
        public visitorId?: number,
        public type?: VisitorType,
        public allowedFrom?: Moment,
        public allowedTo?: Moment,
        public location?: string,
        public email?: string,
        public phone?: number,
        public status?: boolean,
        public qrString?: string,
        public employee?: IEmployee,
        public movements?: IMovement[]
    ) {
        this.status = this.status || false;
    }
}
