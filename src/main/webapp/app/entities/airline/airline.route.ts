import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AirlineComponent } from './airline.component';
import { AirlineDetailComponent } from './airline-detail.component';
import { AirlinePopupComponent } from './airline-dialog.component';
import { AirlineDeletePopupComponent } from './airline-delete-dialog.component';

export const airlineRoute: Routes = [
    {
        path: 'airline',
        component: AirlineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'airline/:id',
        component: AirlineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airlinePopupRoute: Routes = [
    {
        path: 'airline-new',
        component: AirlinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airline/:id/edit',
        component: AirlinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airline/:id/delete',
        component: AirlineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
