import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Airline } from './airline.model';
import { AirlinePopupService } from './airline-popup.service';
import { AirlineService } from './airline.service';

@Component({
    selector: 'jhi-airline-delete-dialog',
    templateUrl: './airline-delete-dialog.component.html'
})
export class AirlineDeleteDialogComponent {

    airline: Airline;

    constructor(
        private airlineService: AirlineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airlineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'airlineListModification',
                content: 'Deleted an airline'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-airline-delete-popup',
    template: ''
})
export class AirlineDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airlinePopupService: AirlinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.airlinePopupService
                .open(AirlineDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
