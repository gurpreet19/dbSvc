import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVisitor } from 'app/shared/model/visitor.model';
import { AccountService } from 'app/core';
import { VisitorService } from './visitor.service';

@Component({
    selector: 'jhi-visitor',
    templateUrl: './visitor.component.html'
})
export class VisitorComponent implements OnInit, OnDestroy {
    visitors: IVisitor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected visitorService: VisitorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.visitorService.query().subscribe(
            (res: HttpResponse<IVisitor[]>) => {
                this.visitors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVisitors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVisitor) {
        return item.id;
    }

    registerChangeInVisitors() {
        this.eventSubscriber = this.eventManager.subscribe('visitorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
