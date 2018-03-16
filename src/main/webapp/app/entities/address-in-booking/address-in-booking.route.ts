import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AddressInBookingComponent } from './address-in-booking.component';
import { AddressInBookingDetailComponent } from './address-in-booking-detail.component';
import { AddressInBookingPopupComponent } from './address-in-booking-dialog.component';
import { AddressInBookingDeletePopupComponent } from './address-in-booking-delete-dialog.component';

export const addressInBookingRoute: Routes = [
    {
        path: 'address-in-booking',
        component: AddressInBookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.addressInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-in-booking/:id',
        component: AddressInBookingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.addressInBooking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressInBookingPopupRoute: Routes = [
    {
        path: 'address-in-booking-new',
        component: AddressInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.addressInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-in-booking/:id/edit',
        component: AddressInBookingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.addressInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-in-booking/:id/delete',
        component: AddressInBookingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.addressInBooking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
