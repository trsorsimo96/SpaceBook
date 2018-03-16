import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConfigFees } from './config-fees.model';
import { ConfigFeesService } from './config-fees.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-config-fees',
    templateUrl: './config-fees.component.html'
})
export class ConfigFeesComponent implements OnInit, OnDestroy {
configFees: ConfigFees[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private configFeesService: ConfigFeesService,
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
            this.configFeesService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ConfigFees[]>) => this.configFees = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.configFeesService.query().subscribe(
            (res: HttpResponse<ConfigFees[]>) => {
                this.configFees = res.body;
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
        this.registerChangeInConfigFees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ConfigFees) {
        return item.id;
    }
    registerChangeInConfigFees() {
        this.eventSubscriber = this.eventManager.subscribe('configFeesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
