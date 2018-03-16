import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AirportComponent } from './airport.component';
import { AirportDetailComponent } from './airport-detail.component';
import { AirportPopupComponent } from './airport-dialog.component';
import { AirportDeletePopupComponent } from './airport-delete-dialog.component';

export const airportRoute: Routes = [
    {
        path: 'airport',
        component: AirportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'airport/:id',
        component: AirportDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airportPopupRoute: Routes = [
    {
        path: 'airport-new',
        component: AirportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airport/:id/edit',
        component: AirportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'airport/:id/delete',
        component: AirportDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
