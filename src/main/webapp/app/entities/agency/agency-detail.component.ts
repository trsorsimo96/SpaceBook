import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Agency } from './agency.model';
import { AgencyService } from './agency.service';

@Component({
    selector: 'jhi-agency-detail',
    templateUrl: './agency-detail.component.html'
})
export class AgencyDetailComponent implements OnInit, OnDestroy {

    agency: Agency;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private agencyService: AgencyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAgencies();
    }

    load(id) {
        this.agencyService.find(id)
            .subscribe((agencyResponse: HttpResponse<Agency>) => {
                this.agency = agencyResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAgencies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'agencyListModification',
            (response) => this.load(this.agency.id)
        );
    }
}
