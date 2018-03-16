import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Airport } from './airport.model';
import { AirportPopupService } from './airport-popup.service';
import { AirportService } from './airport.service';
import { Segment, SegmentService } from '../segment';
import { Town, TownService } from '../town';

@Component({
    selector: 'jhi-airport-dialog',
    templateUrl: './airport-dialog.component.html'
})
export class AirportDialogComponent implements OnInit {

    airport: Airport;
    isSaving: boolean;

    origins: Segment[];

    destinations: Segment[];

    towns: Town[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private airportService: AirportService,
        private segmentService: SegmentService,
        private townService: TownService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.segmentService
            .query({filter: 'airport-is-null'})
            .subscribe((res: HttpResponse<Segment[]>) => {
                if (!this.airport.origin || !this.airport.origin.id) {
                    this.origins = res.body;
                } else {
                    this.segmentService
                        .find(this.airport.origin.id)
                        .subscribe((subRes: HttpResponse<Segment>) => {
                            this.origins = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.segmentService
            .query({filter: 'airport-is-null'})
            .subscribe((res: HttpResponse<Segment[]>) => {
                if (!this.airport.destination || !this.airport.destination.id) {
                    this.destinations = res.body;
                } else {
                    this.segmentService
                        .find(this.airport.destination.id)
                        .subscribe((subRes: HttpResponse<Segment>) => {
                            this.destinations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.townService.query()
            .subscribe((res: HttpResponse<Town[]>) => { this.towns = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airportService.update(this.airport));
        } else {
            this.subscribeToSaveResponse(
                this.airportService.create(this.airport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Airport>>) {
        result.subscribe((res: HttpResponse<Airport>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Airport) {
        this.eventManager.broadcast({ name: 'airportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSegmentById(index: number, item: Segment) {
        return item.id;
    }

    trackTownById(index: number, item: Town) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-airport-popup',
    template: ''
})
export class AirportPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airportPopupService: AirportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.airportPopupService
                    .open(AirportDialogComponent as Component, params['id']);
            } else {
                this.airportPopupService
                    .open(AirportDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
