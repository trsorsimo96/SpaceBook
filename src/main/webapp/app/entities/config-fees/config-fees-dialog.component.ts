import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigFees } from './config-fees.model';
import { ConfigFeesPopupService } from './config-fees-popup.service';
import { ConfigFeesService } from './config-fees.service';

@Component({
    selector: 'jhi-config-fees-dialog',
    templateUrl: './config-fees-dialog.component.html'
})
export class ConfigFeesDialogComponent implements OnInit {

    configFees: ConfigFees;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private configFeesService: ConfigFeesService,
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
        if (this.configFees.id !== undefined) {
            this.subscribeToSaveResponse(
                this.configFeesService.update(this.configFees));
        } else {
            this.subscribeToSaveResponse(
                this.configFeesService.create(this.configFees));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ConfigFees>>) {
        result.subscribe((res: HttpResponse<ConfigFees>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ConfigFees) {
        this.eventManager.broadcast({ name: 'configFeesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-config-fees-popup',
    template: ''
})
export class ConfigFeesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configFeesPopupService: ConfigFeesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.configFeesPopupService
                    .open(ConfigFeesDialogComponent as Component, params['id']);
            } else {
                this.configFeesPopupService
                    .open(ConfigFeesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
