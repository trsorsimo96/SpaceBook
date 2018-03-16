import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AirLoyalty } from './air-loyalty.model';
import { AirLoyaltyPopupService } from './air-loyalty-popup.service';
import { AirLoyaltyService } from './air-loyalty.service';

@Component({
    selector: 'jhi-air-loyalty-delete-dialog',
    templateUrl: './air-loyalty-delete-dialog.component.html'
})
export class AirLoyaltyDeleteDialogComponent {

    airLoyalty: AirLoyalty;

    constructor(
        private airLoyaltyService: AirLoyaltyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airLoyaltyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'airLoyaltyListModification',
                content: 'Deleted an airLoyalty'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-air-loyalty-delete-popup',
    template: ''
})
export class AirLoyaltyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private airLoyaltyPopupService: AirLoyaltyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.airLoyaltyPopupService
                .open(AirLoyaltyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
