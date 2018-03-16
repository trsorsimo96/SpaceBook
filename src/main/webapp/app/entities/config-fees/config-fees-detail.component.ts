import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigFees } from './config-fees.model';
import { ConfigFeesService } from './config-fees.service';

@Component({
    selector: 'jhi-config-fees-detail',
    templateUrl: './config-fees-detail.component.html'
})
export class ConfigFeesDetailComponent implements OnInit, OnDestroy {

    configFees: ConfigFees;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private configFeesService: ConfigFeesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConfigFees();
    }

    load(id) {
        this.configFeesService.find(id)
            .subscribe((configFeesResponse: HttpResponse<ConfigFees>) => {
                this.configFees = configFeesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConfigFees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'configFeesListModification',
            (response) => this.load(this.configFees.id)
        );
    }
}
