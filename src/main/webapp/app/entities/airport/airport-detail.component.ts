import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Airport } from './airport.model';
import { AirportService } from './airport.service';

@Component({
    selector: 'jhi-airport-detail',
    templateUrl: './airport-detail.component.html'
})
export class AirportDetailComponent implements OnInit, OnDestroy {

    airport: Airport;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private airportService: AirportService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAirports();
    }

    load(id) {
        this.airportService.find(id)
            .subscribe((airportResponse: HttpResponse<Airport>) => {
                this.airport = airportResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAirports() {
        this.eventSubscriber = this.eventManager.subscribe(
            'airportListModification',
            (response) => this.load(this.airport.id)
        );
    }
}
