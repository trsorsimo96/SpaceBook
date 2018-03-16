import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneInBooking } from './phone-in-booking.model';
import { PhoneInBookingService } from './phone-in-booking.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-phone-in-booking',
    templateUrl: './phone-in-booking.component.html'
})
export class PhoneInBookingComponent implements OnInit, OnDestroy {
phoneInBookings: PhoneInBooking[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private phoneInBookingService: PhoneInBookingService,
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
            this.phoneInBookingService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PhoneInBooking[]>) => this.phoneInBookings = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.phoneInBookingService.query().subscribe(
            (res: HttpResponse<PhoneInBooking[]>) => {
                this.phoneInBookings = res.body;
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
        this.registerChangeInPhoneInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhoneInBooking) {
        return item.id;
    }
    registerChangeInPhoneInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('phoneInBookingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
