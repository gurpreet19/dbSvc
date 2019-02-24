import { IVisitor } from 'app/shared/model//visitor.model';

export interface IEmployee {
    id?: number;
    employeeId?: number;
    employeeName?: string;
    visitors?: IVisitor[];
}

export class Employee implements IEmployee {
    constructor(public id?: number, public employeeId?: number, public employeeName?: string, public visitors?: IVisitor[]) {}
}
