import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    BookingService,
    BookingPopupService,
    BookingComponent,
    BookingDetailComponent,
    BookingDialogComponent,
    BookingPopupComponent,
    BookingDeletePopupComponent,
    BookingDeleteDialogComponent,
    bookingRoute,
    bookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookingRoute,
    ...bookingPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BookingComponent,
        BookingDetailComponent,
        BookingDialogComponent,
        BookingDeleteDialogComponent,
        BookingPopupComponent,
        BookingDeletePopupComponent,
    ],
    entryComponents: [
        BookingComponent,
        BookingDialogComponent,
        BookingPopupComponent,
        BookingDeleteDialogComponent,
        BookingDeletePopupComponent,
    ],
    providers: [
        BookingService,
        BookingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookBookingModule {}
