import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Passenger } from './passenger.model';
import { PassengerPopupService } from './passenger-popup.service';
import { PassengerService } from './passenger.service';
import { Corporate, CorporateService } from '../corporate';
import { Booking, BookingService } from '../booking';

@Component({
    selector: 'jhi-passenger-dialog',
    templateUrl: './passenger-dialog.component.html'
})
export class PassengerDialogComponent implements OnInit {

    passenger: Passenger;
    isSaving: boolean;

    corporates: Corporate[];

    bookings: Booking[];
    birthdayDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private passengerService: PassengerService,
        private corporateService: CorporateService,
        private bookingService: BookingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.corporateService.query()
            .subscribe((res: HttpResponse<Corporate[]>) => { this.corporates = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bookingService.query()
            .subscribe((res: HttpResponse<Booking[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.passenger.id !== undefined) {
            this.subscribeToSaveResponse(
                this.passengerService.update(this.passenger));
        } else {
            this.subscribeToSaveResponse(
                this.passengerService.create(this.passenger));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Passenger>>) {
        result.subscribe((res: HttpResponse<Passenger>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Passenger) {
        this.eventManager.broadcast({ name: 'passengerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCorporateById(index: number, item: Corporate) {
        return item.id;
    }

    trackBookingById(index: number, item: Booking) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-passenger-popup',
    template: ''
})
export class PassengerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private passengerPopupService: PassengerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.passengerPopupService
                    .open(PassengerDialogComponent as Component, params['id']);
            } else {
                this.passengerPopupService
                    .open(PassengerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
