import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    EmailInBookingService,
    EmailInBookingPopupService,
    EmailInBookingComponent,
    EmailInBookingDetailComponent,
    EmailInBookingDialogComponent,
    EmailInBookingPopupComponent,
    EmailInBookingDeletePopupComponent,
    EmailInBookingDeleteDialogComponent,
    emailInBookingRoute,
    emailInBookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emailInBookingRoute,
    ...emailInBookingPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmailInBookingComponent,
        EmailInBookingDetailComponent,
        EmailInBookingDialogComponent,
        EmailInBookingDeleteDialogComponent,
        EmailInBookingPopupComponent,
        EmailInBookingDeletePopupComponent,
    ],
    entryComponents: [
        EmailInBookingComponent,
        EmailInBookingDialogComponent,
        EmailInBookingPopupComponent,
        EmailInBookingDeleteDialogComponent,
        EmailInBookingDeletePopupComponent,
    ],
    providers: [
        EmailInBookingService,
        EmailInBookingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookEmailInBookingModule {}
