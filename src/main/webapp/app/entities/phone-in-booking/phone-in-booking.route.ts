import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhoneInBookingComponent } from './phone-in-booking.component';
import { PhoneInBookingDetailComponent } from './phone-in-booking-detail.component';
import { PhoneInBookingPopupComponent } from './phone-in-booking-dialog.component';
import { PhoneInBookingDeletePopupComponent } from './phone-in-booking-delete-dialog.component';

export const phoneInBookingRoute: Routes = [
    {
        path: 'phone-in-booking',
        component: PhoneInBookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.phoneInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phone-in-booking/:id',
        component: PhoneInBookingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.phoneInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phoneInBookingPopupRoute: Routes = [
    {
        path: 'phone-in-booking-new',
        component: PhoneInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.phoneInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-in-booking/:id/edit',
        component: PhoneInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.phoneInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-in-booking/:id/delete',
        component: PhoneInBookingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.phoneInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
