import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConfigFeesComponent } from './config-fees.component';
import { ConfigFeesDetailComponent } from './config-fees-detail.component';
import { ConfigFeesPopupComponent } from './config-fees-dialog.component';
import { ConfigFeesDeletePopupComponent } from './config-fees-delete-dialog.component';

export const configFeesRoute: Routes = [
    {
        path: 'config-fees',
        component: ConfigFeesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.configFees.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'config-fees/:id',
        component: ConfigFeesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.configFees.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const configFeesPopupRoute: Routes = [
    {
        path: 'config-fees-new',
        component: ConfigFeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.configFees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'config-fees/:id/edit',
        component: ConfigFeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.configFees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'config-fees/:id/delete',
        component: ConfigFeesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.configFees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
