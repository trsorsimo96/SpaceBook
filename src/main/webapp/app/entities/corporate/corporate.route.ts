import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CorporateComponent } from './corporate.component';
import { CorporateDetailComponent } from './corporate-detail.component';
import { CorporatePopupComponent } from './corporate-dialog.component';
import { CorporateDeletePopupComponent } from './corporate-delete-dialog.component';

export const corporateRoute: Routes = [
    {
        path: 'corporate',
        component: CorporateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.corporate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'corporate/:id',
        component: CorporateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.corporate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const corporatePopupRoute: Routes = [
    {
        path: 'corporate-new',
        component: CorporatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.corporate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'corporate/:id/edit',
        component: CorporatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.corporate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'corporate/:id/delete',
        component: CorporateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.corporate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
