import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GroupAirlineAlliance } from './group-airline-alliance.model';
import { GroupAirlineAllianceService } from './group-airline-alliance.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-group-airline-alliance',
    templateUrl: './group-airline-alliance.component.html'
})
export class GroupAirlineAllianceComponent implements OnInit, OnDestroy {
groupAirlineAlliances: GroupAirlineAlliance[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private groupAirlineAllianceService: GroupAirlineAllianceService,
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
            this.groupAirlineAllianceService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<GroupAirlineAlliance[]>) => this.groupAirlineAlliances = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.groupAirlineAllianceService.query().subscribe(
            (res: HttpResponse<GroupAirlineAlliance[]>) => {
                this.groupAirlineAlliances = res.body;
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
        this.registerChangeInGroupAirlineAlliances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GroupAirlineAlliance) {
        return item.id;
    }
    registerChangeInGroupAirlineAlliances() {
        this.eventSubscriber = this.eventManager.subscribe('groupAirlineAllianceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
