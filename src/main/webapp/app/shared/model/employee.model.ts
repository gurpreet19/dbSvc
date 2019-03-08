import { IVisitor } from 'app/shared/model//visitor.model';

export interface IEmployee {
    id?: number;
    employeeId?: number;
    employeeName?: string;
    photo?: string;
    email?: string;
    password?: string;
    visitors?: IVisitor[];
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public employeeId?: number,
        public employeeName?: string,
        public photo?: string,
        public email?: string,
        public password?: string,
        public visitors?: IVisitor[]
    ) {}
}
