import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmailInBooking } from './email-in-booking.model';
import { EmailInBookingPopupService } from './email-in-booking-popup.service';
import { EmailInBookingService } from './email-in-booking.service';

@Component({
    selector: 'jhi-email-in-booking-delete-dialog',
    templateUrl: './email-in-booking-delete-dialog.component.html'
})
export class EmailInBookingDeleteDialogComponent {

    emailInBooking: EmailInBooking;

    constructor(
        private emailInBookingService: EmailInBookingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailInBookingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emailInBookingListModification',
                content: 'Deleted an emailInBooking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-in-booking-delete-popup',
    template: ''
})
export class EmailInBookingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailInBookingPopupService: EmailInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emailInBookingPopupService
                .open(EmailInBookingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
