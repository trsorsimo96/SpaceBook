import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Town } from './town.model';
import { TownPopupService } from './town-popup.service';
import { TownService } from './town.service';
import { Country, CountryService } from '../country';
import { PhoneInBooking, PhoneInBookingService } from '../phone-in-booking';

@Component({
    selector: 'jhi-town-dialog',
    templateUrl: './town-dialog.component.html'
})
export class TownDialogComponent implements OnInit {

    town: Town;
    isSaving: boolean;

    countries: Country[];

    phoneinbookings: PhoneInBooking[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private townService: TownService,
        private countryService: CountryService,
        private phoneInBookingService: PhoneInBookingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.phoneInBookingService.query()
            .subscribe((res: HttpResponse<PhoneInBooking[]>) => { this.phoneinbookings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.town.id !== undefined) {
            this.subscribeToSaveResponse(
                this.townService.update(this.town));
        } else {
            this.subscribeToSaveResponse(
                this.townService.create(this.town));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Town>>) {
        result.subscribe((res: HttpResponse<Town>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Town) {
        this.eventManager.broadcast({ name: 'townListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackPhoneInBookingById(index: number, item: PhoneInBooking) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-town-popup',
    template: ''
})
export class TownPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private townPopupService: TownPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.townPopupService
                    .open(TownDialogComponent as Component, params['id']);
            } else {
                this.townPopupService
                    .open(TownDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
