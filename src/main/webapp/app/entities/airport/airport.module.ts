import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    AirportService,
    AirportPopupService,
    AirportComponent,
    AirportDetailComponent,
    AirportDialogComponent,
    AirportPopupComponent,
    AirportDeletePopupComponent,
    AirportDeleteDialogComponent,
    airportRoute,
    airportPopupRoute,
} from './';

const ENTITY_STATES = [
    ...airportRoute,
    ...airportPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirportComponent,
        AirportDetailComponent,
        AirportDialogComponent,
        AirportDeleteDialogComponent,
        AirportPopupComponent,
        AirportDeletePopupComponent,
    ],
    entryComponents: [
        AirportComponent,
        AirportDialogComponent,
        AirportPopupComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent,
    ],
    providers: [
        AirportService,
        AirportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookAirportModule {}
