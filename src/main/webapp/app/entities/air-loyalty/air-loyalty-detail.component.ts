import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AirLoyalty } from './air-loyalty.model';
import { AirLoyaltyService } from './air-loyalty.service';

@Component({
    selector: 'jhi-air-loyalty-detail',
    templateUrl: './air-loyalty-detail.component.html'
})
export class AirLoyaltyDetailComponent implements OnInit, OnDestroy {

    airLoyalty: AirLoyalty;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private airLoyaltyService: AirLoyaltyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAirLoyalties();
    }

    load(id) {
        this.airLoyaltyService.find(id)
            .subscribe((airLoyaltyResponse: HttpResponse<AirLoyalty>) => {
                this.airLoyalty = airLoyaltyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAirLoyalties() {
        this.eventSubscriber = this.eventManager.subscribe(
            'airLoyaltyListModification',
            (response) => this.load(this.airLoyalty.id)
        );
    }
}
