import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DbSvcEmployeeModule } from './employee/employee.module';
import { DbSvcMovementModule } from './movement/movement.module';
import { DbSvcVisitorModule } from './visitor/visitor.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DbSvcEmployeeModule,
        DbSvcMovementModule,
        DbSvcVisitorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbSvcEntityModule {}
