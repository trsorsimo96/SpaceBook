import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpaceBookSharedModule } from '../../shared';
import {
    ConfigFeesService,
    ConfigFeesPopupService,
    ConfigFeesComponent,
    ConfigFeesDetailComponent,
    ConfigFeesDialogComponent,
    ConfigFeesPopupComponent,
    ConfigFeesDeletePopupComponent,
    ConfigFeesDeleteDialogComponent,
    configFeesRoute,
    configFeesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...configFeesRoute,
    ...configFeesPopupRoute,
];

@NgModule({
    imports: [
        SpaceBookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConfigFeesComponent,
        ConfigFeesDetailComponent,
        ConfigFeesDialogComponent,
        ConfigFeesDeleteDialogComponent,
        ConfigFeesPopupComponent,
        ConfigFeesDeletePopupComponent,
    ],
    entryComponents: [
        ConfigFeesComponent,
        ConfigFeesDialogComponent,
        ConfigFeesPopupComponent,
        ConfigFeesDeleteDialogComponent,
        ConfigFeesDeletePopupComponent,
    ],
    providers: [
        ConfigFeesService,
        ConfigFeesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookConfigFeesModule {}
