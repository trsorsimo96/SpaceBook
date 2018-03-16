import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AirLoyaltyComponent } from './air-loyalty.component';
import { AirLoyaltyDetailComponent } from './air-loyalty-detail.component';
import { AirLoyaltyPopupComponent } from './air-loyalty-dialog.component';
import { AirLoyaltyDeletePopupComponent } from './air-loyalty-delete-dialog.component';

export const airLoyaltyRoute: Routes = [
    {
        path: 'air-loyalty',
        component: AirLoyaltyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airLoyalty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'air-loyalty/:id',
        component: AirLoyaltyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airLoyalty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airLoyaltyPopupRoute: Routes = [
    {
        path: 'air-loyalty-new',
        component: AirLoyaltyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airLoyalty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'air-loyalty/:id/edit',
        component: AirLoyaltyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airLoyalty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'air-loyalty/:id/delete',
        component: AirLoyaltyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.airLoyalty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
