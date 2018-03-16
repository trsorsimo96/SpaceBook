import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    PhoneInBookingService,
    PhoneInBookingPopupService,
    PhoneInBookingComponent,
    PhoneInBookingDetailComponent,
    PhoneInBookingDialogComponent,
    PhoneInBookingPopupComponent,
    PhoneInBookingDeletePopupComponent,
    PhoneInBookingDeleteDialogComponent,
    phoneInBookingRoute,
    phoneInBookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...phoneInBookingRoute,
    ...phoneInBookingPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhoneInBookingComponent,
        PhoneInBookingDetailComponent,
        PhoneInBookingDialogComponent,
        PhoneInBookingDeleteDialogComponent,
        PhoneInBookingPopupComponent,
        PhoneInBookingDeletePopupComponent,
    ],
    entryComponents: [
        PhoneInBookingComponent,
        PhoneInBookingDialogComponent,
        PhoneInBookingPopupComponent,
        PhoneInBookingDeleteDialogComponent,
        PhoneInBookingDeletePopupComponent,
    ],
    providers: [
        PhoneInBookingService,
        PhoneInBookingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookPhoneInBookingModule {}
