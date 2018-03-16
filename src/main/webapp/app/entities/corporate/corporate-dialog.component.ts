import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Corporate } from './corporate.model';
import { CorporatePopupService } from './corporate-popup.service';
import { CorporateService } from './corporate.service';

@Component({
    selector: 'jhi-corporate-dialog',
    templateUrl: './corporate-dialog.component.html'
})
export class CorporateDialogComponent implements OnInit {

    corporate: Corporate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private corporateService: CorporateService,
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
        if (this.corporate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.corporateService.update(this.corporate));
        } else {
            this.subscribeToSaveResponse(
                this.corporateService.create(this.corporate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Corporate>>) {
        result.subscribe((res: HttpResponse<Corporate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Corporate) {
        this.eventManager.broadcast({ name: 'corporateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-corporate-popup',
    template: ''
})
export class CorporatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private corporatePopupService: CorporatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.corporatePopupService
                    .open(CorporateDialogComponent as Component, params['id']);
            } else {
                this.corporatePopupService
                    .open(CorporateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
