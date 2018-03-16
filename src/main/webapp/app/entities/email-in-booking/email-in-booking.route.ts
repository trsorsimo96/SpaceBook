import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmailInBookingComponent } from './email-in-booking.component';
import { EmailInBookingDetailComponent } from './email-in-booking-detail.component';
import { EmailInBookingPopupComponent } from './email-in-booking-dialog.component';
import { EmailInBookingDeletePopupComponent } from './email-in-booking-delete-dialog.component';

export const emailInBookingRoute: Routes = [
    {
        path: 'email-in-booking',
        component: EmailInBookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.emailInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'email-in-booking/:id',
        component: EmailInBookingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.emailInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailInBookingPopupRoute: Routes = [
    {
        path: 'email-in-booking-new',
        component: EmailInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.emailInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-in-booking/:id/edit',
        component: EmailInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.emailInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'email-in-booking/:id/delete',
        component: EmailInBookingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.emailInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
