import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    AgencyService,
    AgencyPopupService,
    AgencyComponent,
    AgencyDetailComponent,
    AgencyDialogComponent,
    AgencyPopupComponent,
    AgencyDeletePopupComponent,
    AgencyDeleteDialogComponent,
    agencyRoute,
    agencyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agencyRoute,
    ...agencyPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AgencyComponent,
        AgencyDetailComponent,
        AgencyDialogComponent,
        AgencyDeleteDialogComponent,
        AgencyPopupComponent,
        AgencyDeletePopupComponent,
    ],
    entryComponents: [
        AgencyComponent,
        AgencyDialogComponent,
        AgencyPopupComponent,
        AgencyDeleteDialogComponent,
        AgencyDeletePopupComponent,
    ],
    providers: [
        AgencyService,
        AgencyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookAgencyModule {}
