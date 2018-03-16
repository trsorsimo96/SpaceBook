import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SegmentComponent } from './segment.component';
import { SegmentDetailComponent } from './segment-detail.component';
import { SegmentPopupComponent } from './segment-dialog.component';
import { SegmentDeletePopupComponent } from './segment-delete-dialog.component';

export const segmentRoute: Routes = [
    {
        path: 'segment',
        component: SegmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.segment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'segment/:id',
        component: SegmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.segment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const segmentPopupRoute: Routes = [
    {
        path: 'segment-new',
        component: SegmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.segment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'segment/:id/edit',
        component: SegmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.segment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'segment/:id/delete',
        component: SegmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'spaceBookApp.segment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
