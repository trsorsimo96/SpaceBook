import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail.component';
import { BookingPopupComponent } from './booking-dialog.component';
import { BookingDeletePopupComponent } from './booking-delete-dialog.component';

export const bookingRoute: Routes = [
    {
        path: 'booking',
        component: BookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'booking/:id',
        component: BookingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: 'booking-new',
        component: BookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking/:id/edit',
        component: BookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking/:id/delete',
        component: BookingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
