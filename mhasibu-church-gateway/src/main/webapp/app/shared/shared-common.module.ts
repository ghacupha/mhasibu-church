import { NgModule } from '@angular/core';

import { MhasibuChurchWebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [MhasibuChurchWebSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [MhasibuChurchWebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class MhasibuChurchWebSharedCommonModule {}
