import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    TownService,
    TownPopupService,
    TownComponent,
    TownDetailComponent,
    TownDialogComponent,
    TownPopupComponent,
    TownDeletePopupComponent,
    TownDeleteDialogComponent,
    townRoute,
    townPopupRoute,
} from './';

const ENTITY_STATES = [
    ...townRoute,
    ...townPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TownComponent,
        TownDetailComponent,
        TownDialogComponent,
        TownDeleteDialogComponent,
        TownPopupComponent,
        TownDeletePopupComponent,
    ],
    entryComponents: [
        TownComponent,
        TownDialogComponent,
        TownPopupComponent,
        TownDeleteDialogComponent,
        TownDeletePopupComponent,
    ],
    providers: [
        TownService,
        TownPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookTownModule {}
