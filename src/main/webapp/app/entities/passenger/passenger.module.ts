import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    PassengerService,
    PassengerPopupService,
    PassengerComponent,
    PassengerDetailComponent,
    PassengerDialogComponent,
    PassengerPopupComponent,
    PassengerDeletePopupComponent,
    PassengerDeleteDialogComponent,
    passengerRoute,
    passengerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...passengerRoute,
    ...passengerPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PassengerComponent,
        PassengerDetailComponent,
        PassengerDialogComponent,
        PassengerDeleteDialogComponent,
        PassengerPopupComponent,
        PassengerDeletePopupComponent,
    ],
    entryComponents: [
        PassengerComponent,
        PassengerDialogComponent,
        PassengerPopupComponent,
        PassengerDeleteDialogComponent,
        PassengerDeletePopupComponent,
    ],
    providers: [
        PassengerService,
        PassengerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookPassengerModule {}
