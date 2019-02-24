import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMovement } from 'app/shared/model/movement.model';
import { MovementService } from './movement.service';
import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from 'app/entities/visitor';

@Component({
    selector: 'jhi-movement-update',
    templateUrl: './movement-update.component.html'
})
export class MovementUpdateComponent implements OnInit {
    movement: IMovement;
    isSaving: boolean;

    visitors: IVisitor[];
    timeStamp: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected movementService: MovementService,
        protected visitorService: VisitorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movement }) => {
            this.movement = movement;
            this.timeStamp = this.movement.timeStamp != null ? this.movement.timeStamp.format(DATE_TIME_FORMAT) : null;
        });
        this.visitorService.query().subscribe(
            (res: HttpResponse<IVisitor[]>) => {
                this.visitors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.movement.timeStamp = this.timeStamp != null ? moment(this.timeStamp, DATE_TIME_FORMAT) : null;
        if (this.movement.id !== undefined) {
            this.subscribeToSaveResponse(this.movementService.update(this.movement));
        } else {
            this.subscribeToSaveResponse(this.movementService.create(this.movement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovement>>) {
        result.subscribe((res: HttpResponse<IMovement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVisitorById(index: number, item: IVisitor) {
        return item.id;
    }
}
