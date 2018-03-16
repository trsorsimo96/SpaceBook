import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GroupAirlineAlliance } from './group-airline-alliance.model';
import { GroupAirlineAllianceService } from './group-airline-alliance.service';

@Component({
    selector: 'jhi-group-airline-alliance-detail',
    templateUrl: './group-airline-alliance-detail.component.html'
})
export class GroupAirlineAllianceDetailComponent implements OnInit, OnDestroy {

    groupAirlineAlliance: GroupAirlineAlliance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private groupAirlineAllianceService: GroupAirlineAllianceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroupAirlineAlliances();
    }

    load(id) {
        this.groupAirlineAllianceService.find(id)
            .subscribe((groupAirlineAllianceResponse: HttpResponse<GroupAirlineAlliance>) => {
                this.groupAirlineAlliance = groupAirlineAllianceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGroupAirlineAlliances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groupAirlineAllianceListModification',
            (response) => this.load(this.groupAirlineAlliance.id)
        );
    }
}
