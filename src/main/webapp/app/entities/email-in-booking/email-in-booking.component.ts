import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmailInBooking } from './email-in-booking.model';
import { EmailInBookingService } from './email-in-booking.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-email-in-booking',
    templateUrl: './email-in-booking.component.html'
})
export class EmailInBookingComponent implements OnInit, OnDestroy {
emailInBookings: EmailInBooking[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private emailInBookingService: EmailInBookingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.emailInBookingService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<EmailInBooking[]>) => this.emailInBookings = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.emailInBookingService.query().subscribe(
            (res: HttpResponse<EmailInBooking[]>) => {
                this.emailInBookings = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmailInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmailInBooking) {
        return item.id;
    }
    registerChangeInEmailInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('emailInBookingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
