import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PhoneInBooking } from './phone-in-booking.model';
import { PhoneInBookingService } from './phone-in-booking.service';

@Component({
    selector: 'jhi-phone-in-booking-detail',
    templateUrl: './phone-in-booking-detail.component.html'
})
export class PhoneInBookingDetailComponent implements OnInit, OnDestroy {

    phoneInBooking: PhoneInBooking;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private phoneInBookingService: PhoneInBookingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhoneInBookings();
    }

    load(id) {
        this.phoneInBookingService.find(id)
            .subscribe((phoneInBookingResponse: HttpResponse<PhoneInBooking>) => {
                this.phoneInBooking = phoneInBookingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhoneInBookings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'phoneInBookingListModification',
            (response) => this.load(this.phoneInBooking.id)
        );
    }
}
