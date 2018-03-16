import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    CorporateService,
    CorporatePopupService,
    CorporateComponent,
    CorporateDetailComponent,
    CorporateDialogComponent,
    CorporatePopupComponent,
    CorporateDeletePopupComponent,
    CorporateDeleteDialogComponent,
    corporateRoute,
    corporatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...corporateRoute,
    ...corporatePopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CorporateComponent,
        CorporateDetailComponent,
        CorporateDialogComponent,
        CorporateDeleteDialogComponent,
        CorporatePopupComponent,
        CorporateDeletePopupComponent,
    ],
    entryComponents: [
        CorporateComponent,
        CorporateDialogComponent,
        CorporatePopupComponent,
        CorporateDeleteDialogComponent,
        CorporateDeletePopupComponent,
    ],
    providers: [
        CorporateService,
        CorporatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookCorporateModule {}
