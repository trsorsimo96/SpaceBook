import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressInBooking } from './address-in-booking.model';
import { AddressInBookingPopupService } from './address-in-booking-popup.service';
import { AddressInBookingService } from './address-in-booking.service';
import { Country, CountryService } from '../country';
import { Booking, BookingService } from '../booking';

@Component({
    selector: 'jhi-address-in-booking-dialog',
    templateUrl: './address-in-booking-dialog.component.html'
})
export class AddressInBookingDialogComponent implements OnInit {

    addressInBooking: AddressInBooking;
    isSaving: boolean;

    countries: Country[];

    bookings: Booking[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressInBookingService: AddressInBookingService,
        private countryService: CountryService,
        private bookingService: BookingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bookingService.query()
            .subscribe((res: HttpResponse<Booking[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.addressInBooking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressInBookingService.update(this.addressInBooking));
        } else {
            this.subscribeToSaveResponse(
                this.addressInBookingService.create(this.addressInBooking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AddressInBooking>>) {
        result.subscribe((res: HttpResponse<AddressInBooking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressInBooking) {
        this.eventManager.broadcast({ name: 'addressInBookingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackBookingById(index: number, item: Booking) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-address-in-booking-popup',
    template: ''
})
export class AddressInBookingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressInBookingPopupService: AddressInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressInBookingPopupService
                    .open(AddressInBookingDialogComponent as Component, params['id']);
            } else {
                this.addressInBookingPopupService
                    .open(AddressInBookingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
