import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Airline } from './airline.model';
import { AirlineService } from './airline.service';

@Component({
    selector: 'jhi-airline-detail',
    templateUrl: './airline-detail.component.html'
})
export class AirlineDetailComponent implements OnInit, OnDestroy {

    airline: Airline;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private airlineService: AirlineService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAirlines();
    }

    load(id) {
        this.airlineService.find(id)
            .subscribe((airlineResponse: HttpResponse<Airline>) => {
                this.airline = airlineResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAirlines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'airlineListModification',
            (response) => this.load(this.airline.id)
        );
    }
}
