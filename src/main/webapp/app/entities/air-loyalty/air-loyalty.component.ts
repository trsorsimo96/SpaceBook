import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AirLoyalty } from './air-loyalty.model';
import { AirLoyaltyService } from './air-loyalty.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-air-loyalty',
    templateUrl: './air-loyalty.component.html'
})
export class AirLoyaltyComponent implements OnInit, OnDestroy {
airLoyalties: AirLoyalty[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private airLoyaltyService: AirLoyaltyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.airLoyaltyService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<AirLoyalty[]>) => this.airLoyalties = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.airLoyaltyService.query().subscribe(
            (res: HttpResponse<AirLoyalty[]>) => {
                this.airLoyalties = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAirLoyalties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AirLoyalty) {
        return item.id;
    }
    registerChangeInAirLoyalties() {
        this.eventSubscriber = this.eventManager.subscribe('airLoyaltyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
