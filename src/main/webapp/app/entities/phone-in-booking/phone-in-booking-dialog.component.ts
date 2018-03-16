import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneInBooking } from './phone-in-booking.model';
import { PhoneInBookingPopupService } from './phone-in-booking-popup.service';
import { PhoneInBookingService } from './phone-in-booking.service';
import { Booking, BookingService } from '../booking';

@Component({
    selector: 'jhi-phone-in-booking-dialog',
    templateUrl: './phone-in-booking-dialog.component.html'
})
export class PhoneInBookingDialogComponent implements OnInit {

    phoneInBooking: PhoneInBooking;
    isSaving: boolean;

    bookings: Booking[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private phoneInBookingService: PhoneInBookingService,
        private bookingService: BookingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bookingService.query()
            .subscribe((res: HttpResponse<Booking[]>) => { this.bookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phoneInBooking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phoneInBookingService.update(this.phoneInBooking));
        } else {
            this.subscribeToSaveResponse(
                this.phoneInBookingService.create(this.phoneInBooking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PhoneInBooking>>) {
        result.subscribe((res: HttpResponse<PhoneInBooking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PhoneInBooking) {
        this.eventManager.broadcast({ name: 'phoneInBookingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBookingById(index: number, item: Booking) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-phone-in-booking-popup',
    template: ''
})
export class PhoneInBookingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phoneInBookingPopupService: PhoneInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phoneInBookingPopupService
                    .open(PhoneInBookingDialogComponent as Component, params['id']);
            } else {
                this.phoneInBookingPopupService
                    .open(PhoneInBookingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
