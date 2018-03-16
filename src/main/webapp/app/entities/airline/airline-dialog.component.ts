import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Airline } from './airline.model';
import { AirlinePopupService } from './airline-popup.service';
import { AirlineService } from './airline.service';
import { GroupAirlineAlliance, GroupAirlineAllianceService } from '../group-airline-alliance';
import { Segment, SegmentService } from '../segment';
import { ConfigFees, ConfigFeesService } from '../config-fees';

@Component({
    selector: 'jhi-airline-dialog',
    templateUrl: './airline-dialog.component.html'
})
export class AirlineDialogComponent implements OnInit {

    airline: Airline;
    isSaving: boolean;

    groupairlinealliances: GroupAirlineAlliance[];

    segments: Segment[];

    configfees: ConfigFees[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private airlineService: AirlineService,
        private groupAirlineAllianceService: GroupAirlineAllianceService,
        private segmentService: SegmentService,
        private configFeesService: ConfigFeesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.groupAirlineAllianceService.query()
            .subscribe((res: HttpResponse<GroupAirlineAlliance[]>) => { this.groupairlinealliances = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.segmentService.query()
            .subscribe((res: HttpResponse<Segment[]>) => { this.segments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.configFeesService.query()
            .subscribe((res: HttpResponse<ConfigFees[]>) => { this.configfees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.airline.id !== undefined) {
            this.subscribeToSaveResponse(
                this.airlineService.update(this.airline));
        } else {
            this.subscribeToSaveResponse(
                this.airlineService.create(this.airline));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Airline>>) {
        result.subscribe((res: HttpResponse<Airline>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Airline) {
        this.eventManager.broadcast({ name: 'airlineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGroupAirlineAllianceById(index: number, item: GroupAirlineAlliance) {
        return item.id;
    }

    trackSegmentById(index: number, item: Segment) {
        return item.id;
    }

    trackConfigFeesById(index: number, item: ConfigFees) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-airline-popup',
    template: ''
})
export class AirlinePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airlinePopupService: AirlinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.airlinePopupService
                    .open(AirlineDialogComponent as Component, params['id']);
            } else {
                this.airlinePopupService
                    .open(AirlineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
