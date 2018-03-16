import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TownComponent } from './town.component';
import { TownDetailComponent } from './town-detail.component';
import { TownPopupComponent } from './town-dialog.component';
import { TownDeletePopupComponent } from './town-delete-dialog.component';

export const townRoute: Routes = [
    {
        path: 'town',
        component: TownComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.town.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'town/:id',
        component: TownDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.town.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const townPopupRoute: Routes = [
    {
        path: 'town-new',
        component: TownPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.town.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'town/:id/edit',
        component: TownPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.town.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'town/:id/delete',
        component: TownDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.town.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
