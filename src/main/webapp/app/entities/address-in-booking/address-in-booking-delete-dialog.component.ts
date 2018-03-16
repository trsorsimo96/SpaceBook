import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressInBooking } from './address-in-booking.model';
import { AddressInBookingPopupService } from './address-in-booking-popup.service';
import { AddressInBookingService } from './address-in-booking.service';

@Component({
    selector: 'jhi-address-in-booking-delete-dialog',
    templateUrl: './address-in-booking-delete-dialog.component.html'
})
export class AddressInBookingDeleteDialogComponent {

    addressInBooking: AddressInBooking;

    constructor(
        private addressInBookingService: AddressInBookingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressInBookingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressInBookingListModification',
                content: 'Deleted an addressInBooking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-in-booking-delete-popup',
    template: ''
})
export class AddressInBookingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressInBookingPopupService: AddressInBookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressInBookingPopupService
                .open(AddressInBookingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
