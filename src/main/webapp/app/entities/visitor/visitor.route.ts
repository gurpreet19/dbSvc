import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Visitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';
import { VisitorComponent } from './visitor.component';
import { VisitorDetailComponent } from './visitor-detail.component';
import { VisitorUpdateComponent } from './visitor-update.component';
import { VisitorDeletePopupComponent } from './visitor-delete-dialog.component';
import { IVisitor } from 'app/shared/model/visitor.model';

@Injectable({ providedIn: 'root' })
export class VisitorResolve implements Resolve<IVisitor> {
    constructor(private service: VisitorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Visitor> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Visitor>) => response.ok),
                map((visitor: HttpResponse<Visitor>) => visitor.body)
            );
        }
        return of(new Visitor());
    }
}

export const visitorRoute: Routes = [
    {
        path: 'visitor',
        component: VisitorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visitors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'visitor/:id/view',
        component: VisitorDetailComponent,
        resolve: {
            visitor: VisitorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visitors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'visitor/new',
        component: VisitorUpdateComponent,
        resolve: {
            visitor: VisitorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visitors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'visitor/:id/edit',
        component: VisitorUpdateComponent,
        resolve: {
            visitor: VisitorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visitors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitorPopupRoute: Routes = [
    {
        path: 'visitor/:id/delete',
        component: VisitorDeletePopupComponent,
        resolve: {
            visitor: VisitorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Visitors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
