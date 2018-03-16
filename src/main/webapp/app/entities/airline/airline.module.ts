import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    AirlineService,
    AirlinePopupService,
    AirlineComponent,
    AirlineDetailComponent,
    AirlineDialogComponent,
    AirlinePopupComponent,
    AirlineDeletePopupComponent,
    AirlineDeleteDialogComponent,
    airlineRoute,
    airlinePopupRoute,
} from './';

const ENTITY_STATES = [
    ...airlineRoute,
    ...airlinePopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirlineComponent,
        AirlineDetailComponent,
        AirlineDialogComponent,
        AirlineDeleteDialogComponent,
        AirlinePopupComponent,
        AirlineDeletePopupComponent,
    ],
    entryComponents: [
        AirlineComponent,
        AirlineDialogComponent,
        AirlinePopupComponent,
        AirlineDeleteDialogComponent,
        AirlineDeletePopupComponent,
    ],
    providers: [
        AirlineService,
        AirlinePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookAirlineModule {}
