import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AirLoyalty } from './air-loyalty.model';
import { AirLoyaltyPopupService } from './air-loyalty-popup.service';
import { AirLoyaltyService } from './air-loyalty.service';
import { Passenger, PassengerService } from '../passenger';
import { Airline, AirlineService } from '../airline';

@Component({
    selector: 'jhi-air-loyalty-dialog',
    templateUrl: './air-loyalty-dialog.component.html'
})
export class AirLoyaltyDialogComponent implements OnInit {

    airLoyalty: AirLoyalty;
    isSaving: boolean;

    cards: Passenger[];

    airlines: Airline[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private airLoyaltyService: AirLoyaltyService,
        private passengerService: PassengerService,
        private airlineService: AirlineService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.passengerService
            .query({filter: 'airloyalty-is-null'})
            .subscribe((res: HttpResponse<Passenger[]>) => {
                if (!this.airLoyalty.card || !this.airLoyalty.card.id) {
                    this.cards = res.body;
                } else {
                    this.passengerService
                        .find(this.airLoyalty.card.id)
                        .subscribe((subRes: HttpResponse<Passenger>) => {
                            this.cards = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.airlineService.query()
            .subscribe((res: HttpResponse<Airline[]>) => { this.airlines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airLoyalty.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airLoyaltyService.update(this.airLoyalty));
        } else {
            this.subscribeToSaveResponse(
                this.airLoyaltyService.create(this.airLoyalty));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AirLoyalty>>) {
        result.subscribe((res: HttpResponse<AirLoyalty>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AirLoyalty) {
        this.eventManager.broadcast({ name: 'airLoyaltyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPassengerById(index: number, item: Passenger) {
        return item.id;
    }

    trackAirlineById(index: number, item: Airline) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-air-loyalty-popup',
    template: ''
})
export class AirLoyaltyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airLoyaltyPopupService: AirLoyaltyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.airLoyaltyPopupService
                    .open(AirLoyaltyDialogComponent as Component, params['id']);
            } else {
                this.airLoyaltyPopupService
                    .open(AirLoyaltyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
