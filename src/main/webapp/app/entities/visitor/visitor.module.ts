import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbSvcSharedModule } from 'app/shared';
import {
    VisitorComponent,
    VisitorDetailComponent,
    VisitorUpdateComponent,
    VisitorDeletePopupComponent,
    VisitorDeleteDialogComponent,
    visitorRoute,
    visitorPopupRoute
} from './';

const ENTITY_STATES = [...visitorRoute, ...visitorPopupRoute];

@NgModule({
    imports: [DbSvcSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VisitorComponent,
        VisitorDetailComponent,
        VisitorUpdateComponent,
        VisitorDeleteDialogComponent,
        VisitorDeletePopupComponent
    ],
    entryComponents: [VisitorComponent, VisitorUpdateComponent, VisitorDeleteDialogComponent, VisitorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbSvcVisitorModule {}
