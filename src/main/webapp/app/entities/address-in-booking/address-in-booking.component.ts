import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressInBooking } from './address-in-booking.model';
import { AddressInBookingService } from './address-in-booking.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-address-in-booking',
    templateUrl: './address-in-booking.component.html'
})
export class AddressInBookingComponent implements OnInit, OnDestroy {
addressInBookings: AddressInBooking[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private addressInBookingService: AddressInBookingService,
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
            this.addressInBookingService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<AddressInBooking[]>) => this.addressInBookings = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.addressInBookingService.query().subscribe(
            (res: HttpResponse<AddressInBooking[]>) => {
                this.addressInBookings = res.body;
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
        this.registerChangeInAddressInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AddressInBooking) {
        return item.id;
    }
    registerChangeInAddressInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('addressInBookingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
