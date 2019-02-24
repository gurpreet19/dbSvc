import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
    selector: 'jhi-visitor-update',
    templateUrl: './visitor-update.component.html'
})
export class VisitorUpdateComponent implements OnInit {
    visitor: IVisitor;
    isSaving: boolean;

    employees: IEmployee[];
    allowedFrom: string;
    allowedTo: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected visitorService: VisitorService,
        protected employeeService: EmployeeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ visitor }) => {
            this.visitor = visitor;
            this.allowedFrom = this.visitor.allowedFrom != null ? this.visitor.allowedFrom.format(DATE_TIME_FORMAT) : null;
            this.allowedTo = this.visitor.allowedTo != null ? this.visitor.allowedTo.format(DATE_TIME_FORMAT) : null;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.visitor.allowedFrom = this.allowedFrom != null ? moment(this.allowedFrom, DATE_TIME_FORMAT) : null;
        this.visitor.allowedTo = this.allowedTo != null ? moment(this.allowedTo, DATE_TIME_FORMAT) : null;
        if (this.visitor.id !== undefined) {
            this.subscribeToSaveResponse(this.visitorService.update(this.visitor));
        } else {
            this.subscribeToSaveResponse(this.visitorService.create(this.visitor));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitor>>) {
        result.subscribe((res: HttpResponse<IVisitor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
}
