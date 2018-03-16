import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AgencyComponent } from './agency.component';
import { AgencyDetailComponent } from './agency-detail.component';
import { AgencyPopupComponent } from './agency-dialog.component';
import { AgencyDeletePopupComponent } from './agency-delete-dialog.component';

export const agencyRoute: Routes = [
    {
        path: 'agency',
        component: AgencyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.agency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agency/:id',
        component: AgencyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.agency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agencyPopupRoute: Routes = [
    {
        path: 'agency-new',
        component: AgencyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.agency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agency/:id/edit',
        component: AgencyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.agency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agency/:id/delete',
        component: AgencyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.agency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
