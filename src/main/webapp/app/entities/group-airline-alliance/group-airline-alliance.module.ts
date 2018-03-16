import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    GroupAirlineAllianceService,
    GroupAirlineAlliancePopupService,
    GroupAirlineAllianceComponent,
    GroupAirlineAllianceDetailComponent,
    GroupAirlineAllianceDialogComponent,
    GroupAirlineAlliancePopupComponent,
    GroupAirlineAllianceDeletePopupComponent,
    GroupAirlineAllianceDeleteDialogComponent,
    groupAirlineAllianceRoute,
    groupAirlineAlliancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...groupAirlineAllianceRoute,
    ...groupAirlineAlliancePopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroupAirlineAllianceComponent,
        GroupAirlineAllianceDetailComponent,
        GroupAirlineAllianceDialogComponent,
        GroupAirlineAllianceDeleteDialogComponent,
        GroupAirlineAlliancePopupComponent,
        GroupAirlineAllianceDeletePopupComponent,
    ],
    entryComponents: [
        GroupAirlineAllianceComponent,
        GroupAirlineAllianceDialogComponent,
        GroupAirlineAlliancePopupComponent,
        GroupAirlineAllianceDeleteDialogComponent,
        GroupAirlineAllianceDeletePopupComponent,
    ],
    providers: [
        GroupAirlineAllianceService,
        GroupAirlineAlliancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookGroupAirlineAllianceModule {}
