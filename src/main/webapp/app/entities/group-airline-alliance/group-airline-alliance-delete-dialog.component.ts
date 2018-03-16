import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupAirlineAlliance } from './group-airline-alliance.model';
import { GroupAirlineAlliancePopupService } from './group-airline-alliance-popup.service';
import { GroupAirlineAllianceService } from './group-airline-alliance.service';

@Component({
    selector: 'jhi-group-airline-alliance-delete-dialog',
    templateUrl: './group-airline-alliance-delete-dialog.component.html'
})
export class GroupAirlineAllianceDeleteDialogComponent {

    groupAirlineAlliance: GroupAirlineAlliance;

    constructor(
        private groupAirlineAllianceService: GroupAirlineAllianceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groupAirlineAllianceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'groupAirlineAllianceListModification',
                content: 'Deleted an groupAirlineAlliance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-group-airline-alliance-delete-popup',
    template: ''
})
export class GroupAirlineAllianceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupAirlineAlliancePopupService: GroupAirlineAlliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.groupAirlineAlliancePopupService
                .open(GroupAirlineAllianceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
