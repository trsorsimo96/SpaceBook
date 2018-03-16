import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    AddressInBookingService,
    AddressInBookingPopupService,
    AddressInBookingComponent,
    AddressInBookingDetailComponent,
    AddressInBookingDialogComponent,
    AddressInBookingPopupComponent,
    AddressInBookingDeletePopupComponent,
    AddressInBookingDeleteDialogComponent,
    addressInBookingRoute,
    addressInBookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressInBookingRoute,
    ...addressInBookingPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressInBookingComponent,
        AddressInBookingDetailComponent,
        AddressInBookingDialogComponent,
        AddressInBookingDeleteDialogComponent,
        AddressInBookingPopupComponent,
        AddressInBookingDeletePopupComponent,
    ],
    entryComponents: [
        AddressInBookingComponent,
        AddressInBookingDialogComponent,
        AddressInBookingPopupComponent,
        AddressInBookingDeleteDialogComponent,
        AddressInBookingDeletePopupComponent,
    ],
    providers: [
        AddressInBookingService,
        AddressInBookingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookAddressInBookingModule {}
