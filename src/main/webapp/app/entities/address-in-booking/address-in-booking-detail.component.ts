import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AddressInBooking } from './address-in-booking.model';
import { AddressInBookingService } from './address-in-booking.service';

@Component({
    selector: 'jhi-address-in-booking-detail',
    templateUrl: './address-in-booking-detail.component.html'
})
export class AddressInBookingDetailComponent implements OnInit, OnDestroy {

    addressInBooking: AddressInBooking;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressInBookingService: AddressInBookingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressInBookings();
    }

    load(id) {
        this.addressInBookingService.find(id)
            .subscribe((addressInBookingResponse: HttpResponse<AddressInBooking>) => {
                this.addressInBooking = addressInBookingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressInBookings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressInBookingListModification',
            (response) => this.load(this.addressInBooking.id)
        );
    }
}
