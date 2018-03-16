import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GroupAirlineAllianceComponent } from './group-airline-alliance.component';
import { GroupAirlineAllianceDetailComponent } from './group-airline-alliance-detail.component';
import { GroupAirlineAlliancePopupComponent } from './group-airline-alliance-dialog.component';
import { GroupAirlineAllianceDeletePopupComponent } from './group-airline-alliance-delete-dialog.component';

export const groupAirlineAllianceRoute: Routes = [
    {
        path: 'group-airline-alliance',
        component: GroupAirlineAllianceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.groupAirlineAlliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'group-airline-alliance/:id',
        component: GroupAirlineAllianceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.groupAirlineAlliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupAirlineAlliancePopupRoute: Routes = [
    {
        path: 'group-airline-alliance-new',
        component: GroupAirlineAlliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.groupAirlineAlliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-airline-alliance/:id/edit',
        component: GroupAirlineAlliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.groupAirlineAlliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-airline-alliance/:id/delete',
        component: GroupAirlineAllianceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.groupAirlineAlliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
