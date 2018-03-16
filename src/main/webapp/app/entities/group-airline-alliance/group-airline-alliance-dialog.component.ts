import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupAirlineAlliance } from './group-airline-alliance.model';
import { GroupAirlineAlliancePopupService } from './group-airline-alliance-popup.service';
import { GroupAirlineAllianceService } from './group-airline-alliance.service';

@Component({
    selector: 'jhi-group-airline-alliance-dialog',
    templateUrl: './group-airline-alliance-dialog.component.html'
})
export class GroupAirlineAllianceDialogComponent implements OnInit {

    groupAirlineAlliance: GroupAirlineAlliance;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private groupAirlineAllianceService: GroupAirlineAllianceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.groupAirlineAlliance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groupAirlineAllianceService.update(this.groupAirlineAlliance));
        } else {
            this.subscribeToSaveResponse(
                this.groupAirlineAllianceService.create(this.groupAirlineAlliance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GroupAirlineAlliance>>) {
        result.subscribe((res: HttpResponse<GroupAirlineAlliance>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GroupAirlineAlliance) {
        this.eventManager.broadcast({ name: 'groupAirlineAllianceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-group-airline-alliance-popup',
    template: ''
})
export class GroupAirlineAlliancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupAirlineAlliancePopupService: GroupAirlineAlliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groupAirlineAlliancePopupService
                    .open(GroupAirlineAllianceDialogComponent as Component, params['id']);
            } else {
                this.groupAirlineAlliancePopupService
                    .open(GroupAirlineAllianceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
