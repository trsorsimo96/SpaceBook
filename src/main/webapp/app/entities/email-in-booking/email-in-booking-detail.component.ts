import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmailInBooking } from './email-in-booking.model';
import { EmailInBookingService } from './email-in-booking.service';

@Component({
    selector: 'jhi-email-in-booking-detail',
    templateUrl: './email-in-booking-detail.component.html'
})
export class EmailInBookingDetailComponent implements OnInit, OnDestroy {

    emailInBooking: EmailInBooking;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emailInBookingService: EmailInBookingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmailInBookings();
    }

    load(id) {
        this.emailInBookingService.find(id)
            .subscribe((emailInBookingResponse: HttpResponse<EmailInBooking>) => {
                this.emailInBooking = emailInBookingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmailInBookings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emailInBookingListModification',
            (response) => this.load(this.emailInBooking.id)
        );
    }
}
