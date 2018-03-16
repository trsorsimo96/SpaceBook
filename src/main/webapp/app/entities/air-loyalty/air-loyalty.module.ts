import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    AirLoyaltyService,
    AirLoyaltyPopupService,
    AirLoyaltyComponent,
    AirLoyaltyDetailComponent,
    AirLoyaltyDialogComponent,
    AirLoyaltyPopupComponent,
    AirLoyaltyDeletePopupComponent,
    AirLoyaltyDeleteDialogComponent,
    airLoyaltyRoute,
    airLoyaltyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...airLoyaltyRoute,
    ...airLoyaltyPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirLoyaltyComponent,
        AirLoyaltyDetailComponent,
        AirLoyaltyDialogComponent,
        AirLoyaltyDeleteDialogComponent,
        AirLoyaltyPopupComponent,
        AirLoyaltyDeletePopupComponent,
    ],
    entryComponents: [
        AirLoyaltyComponent,
        AirLoyaltyDialogComponent,
        AirLoyaltyPopupComponent,
        AirLoyaltyDeleteDialogComponent,
        AirLoyaltyDeletePopupComponent,
    ],
    providers: [
        AirLoyaltyService,
        AirLoyaltyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookAirLoyaltyModule {}
