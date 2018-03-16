import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Segment } from './segment.model';
import { SegmentService } from './segment.service';

@Component({
    selector: 'jhi-segment-detail',
    templateUrl: './segment-detail.component.html'
})
export class SegmentDetailComponent implements OnInit, OnDestroy {

    segment: Segment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private segmentService: SegmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSegments();
    }

    load(id) {
        this.segmentService.find(id)
            .subscribe((segmentResponse: HttpResponse<Segment>) => {
                this.segment = segmentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSegments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'segmentListModification',
            (response) => this.load(this.segment.id)
        );
    }
}
