import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmailInBooking } from './email-in-booking.model';
import { EmailInBookingPopupService } from './email-in-booking-popup.service';
import { EmailInBookingService } from './email-in-booking.service';
import { Booking, BookingService } from '../booking';

@Component({
    selector: 'jhi-email-in-booking-dialog',
    templateUrl: './email-in-booking-dialog.component.html'
})
export class EmailInBookingDialogComponent implements OnInit {

    emailInBooking: EmailInBooking;
    isSaving: boolean;

    bookings: Booking[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emailInBookingService: EmailInBookingService,
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
        if (this.emailInBooking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emailInBookingService.update(this.emailInBooking));
        } else {
            this.subscribeToSaveResponse(
                this.emailInBookingService.create(this.emailInBooking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmailInBooking>>) {
        result.subscribe((res: HttpResponse<EmailInBooking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmailInBooking) {
        this.eventManager.broadcast({ name: 'emailInBookingListModification', content: 'OK'});
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
    selector: 'jhi-email-in-booking-popup',
    template: ''
})
export class EmailInBookingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailInBookingPopupService: EmailInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emailInBookingPopupService
                    .open(EmailInBookingDialogComponent as Component, params['id']);
            } else {
                this.emailInBookingPopupService
                    .open(EmailInBookingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
