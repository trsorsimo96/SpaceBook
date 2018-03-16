import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Segment } from './segment.model';
import { SegmentPopupService } from './segment-popup.service';
import { SegmentService } from './segment.service';

@Component({
    selector: 'jhi-segment-dialog',
    templateUrl: './segment-dialog.component.html'
})
export class SegmentDialogComponent implements OnInit {

    segment: Segment;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private segmentService: SegmentService,
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
        if (this.segment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.segmentService.update(this.segment));
        } else {
            this.subscribeToSaveResponse(
                this.segmentService.create(this.segment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Segment>>) {
        result.subscribe((res: HttpResponse<Segment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Segment) {
        this.eventManager.broadcast({ name: 'segmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-segment-popup',
    template: ''
})
export class SegmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private segmentPopupService: SegmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.segmentPopupService
                    .open(SegmentDialogComponent as Component, params['id']);
            } else {
                this.segmentPopupService
                    .open(SegmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
