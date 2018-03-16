import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Town } from './town.model';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town-detail',
    templateUrl: './town-detail.component.html'
})
export class TownDetailComponent implements OnInit, OnDestroy {

    town: Town;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private townService: TownService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTowns();
    }

    load(id) {
        this.townService.find(id)
            .subscribe((townResponse: HttpResponse<Town>) => {
                this.town = townResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTowns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'townListModification',
            (response) => this.load(this.town.id)
        );
    }
}
