import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Segment } from './segment.model';
import { SegmentPopupService } from './segment-popup.service';
import { SegmentService } from './segment.service';

@Component({
    selector: 'jhi-segment-delete-dialog',
    templateUrl: './segment-delete-dialog.component.html'
})
export class SegmentDeleteDialogComponent {

    segment: Segment;

    constructor(
        private segmentService: SegmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.segmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'segmentListModification',
                content: 'Deleted an segment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-segment-delete-popup',
    template: ''
})
export class SegmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private segmentPopupService: SegmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.segmentPopupService
                .open(SegmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
