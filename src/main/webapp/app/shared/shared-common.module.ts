import { NgModule } from '@angular/core';

import { DbSvcSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DbSvcSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DbSvcSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DbSvcSharedCommonModule {}
