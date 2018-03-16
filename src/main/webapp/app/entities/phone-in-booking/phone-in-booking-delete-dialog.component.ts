import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PhoneInBooking } from './phone-in-booking.model';
import { PhoneInBookingPopupService } from './phone-in-booking-popup.service';
import { PhoneInBookingService } from './phone-in-booking.service';

@Component({
    selector: 'jhi-phone-in-booking-delete-dialog',
    templateUrl: './phone-in-booking-delete-dialog.component.html'
})
export class PhoneInBookingDeleteDialogComponent {

    phoneInBooking: PhoneInBooking;

    constructor(
        private phoneInBookingService: PhoneInBookingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phoneInBookingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'phoneInBookingListModification',
                content: 'Deleted an phoneInBooking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phone-in-booking-delete-popup',
    template: ''
})
export class PhoneInBookingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phoneInBookingPopupService: PhoneInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.phoneInBookingPopupService
                .open(PhoneInBookingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
